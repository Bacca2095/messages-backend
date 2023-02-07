import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TwilioClient, TwilioService } from 'nestjs-twilio';
import { In, Repository } from 'typeorm';
import { Logger } from 'winston';

import { ClientEntity } from '@client/entities/client.entity';
import { CreateSmsDto, SendSmsDto, SmsDto } from '@sms/dto';
import { FilterSmsDto } from '@sms/dto/filter-sms.dto';
import { SmsEntity, SmsStatus } from '@sms/entities/sms.entity';
import { ProviderNames } from '@sms/enum/provider-names.enum';
import { FilterSms } from '@sms/mapper/filter-sms';

interface TwilioResponse {
  sid: string;
  message: string;
  status: SmsStatus;
  phoneNumber: number;
  client: ClientEntity;
  providerName: ProviderNames.TWILIO;
}

@Injectable()
export class SmsService {
  private client: TwilioClient;

  private context = {
    context: this.constructor.name,
  };

  constructor(
    private readonly twilioService: TwilioService,
    @InjectRepository(SmsEntity)
    private readonly smsRepository: Repository<SmsEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectMapper() private readonly mapper: Mapper,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectQueue('schedule_sms') private readonly queue: Queue,
  ) {
    this.client = this.twilioService.client;
  }

  async addJobToQueueSms(data: CreateSmsDto) {
    const job = await this.queue.add('schedule_sms', data);
    return +job.id;
  }

  async processJobQueueSms() {
    await this.queue.process(async (job) => {
      console.log(await job.data);
    });
  }

  async getJobStatus(jobId: number) {
    const job = await this.queue.getJob(jobId);
    console.log(await job.getState(), 'a');
    return job.getState();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  private async handleScheduledSms(): Promise<void> {
    const context = {
      ...this.context,
      method: this.handleScheduledSms.name,
    };
    this.logger.info('', context);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  private async handleSmsStatus(): Promise<void> {
    const context = {
      ...this.context,
      method: this.handleSmsStatus.name,
    };
    const messages = await this.smsRepository.find({
      where: {
        status: In([
          SmsStatus.ACCEPTED,
          SmsStatus.QUEUED,
          SmsStatus.RECEIVED,
          SmsStatus.SENT,
        ]),
      },
    });

    this.logger.info(`Found ${messages.length} pending messages`, context);

    const result = await Promise.all(
      messages.map(async (message): Promise<SmsEntity> => {
        const res = await this.client.messages(message.externalId).fetch();
        const {
          status,
          dateSent,
          price,
          priceUnit,
          numSegments,
          errorCode,
          errorMessage,
        } = res;
        if (status.includes(SmsStatus.DELIVERED)) {
          const messageStatus = status as SmsStatus;
          return {
            ...message,
            status: messageStatus,
            sendAt: dateSent,
            price: +price,
            segments: +numSegments,
            errorCode: +errorCode,
            errorMessage,
            priceUnit,
          };
        }
      }),
    );

    this.logger.info(`Updating ${result.length} messages`, context);

    const updated = await this.smsRepository.save(result);

    this.logger.info(`Updating ${updated.length} messages`, context);
  }

  async sendSms(dto: CreateSmsDto): Promise<SmsDto> {
    const { message, phoneNumber } = dto;
    const { sid, status } = await this.client.messages.create(
      this.mapper.map(dto, CreateSmsDto, SendSmsDto),
    );

    const client = await this.clientRepository.findOne({
      where: { id: dto.clientId },
    });

    const messageStatus = status as SmsStatus;

    const entity = this.createSmsEntity({
      sid,
      message,
      status: messageStatus,
      phoneNumber,
      client,
      providerName: ProviderNames.TWILIO,
    });

    return this.mapper.mapAsync(
      await this.smsRepository.save(entity),
      SmsEntity,
      SmsDto,
    );
  }

  async sendSmsBatch(dto: CreateSmsDto[]): Promise<SmsDto[]> {
    return await Promise.all(dto.map((sms) => this.sendSms(sms)));
  }

  async findAll(dto: FilterSmsDto): Promise<SmsDto[]> {
    const filterBy = this.mapper.map(dto, FilterSmsDto, FilterSms);
    return this.mapper.mapArrayAsync(
      await this.smsRepository.find({ where: { ...filterBy } }),
      SmsEntity,
      SmsDto,
    );
  }

  async findOne(id: number): Promise<SmsDto> {
    return this.mapper.mapAsync(
      await this.smsRepository.findOne({ where: { id } }),
      SmsEntity,
      SmsDto,
    );
  }

  createSmsEntity(payload: TwilioResponse): SmsEntity {
    const { client, sid, message, status, phoneNumber, providerName } = payload;
    const entity = new SmsEntity();

    entity.externalId = sid;
    entity.message = message;
    entity.status = status;
    entity.phoneNumber = `${phoneNumber}`;
    entity.client = client;
    entity.providerName = providerName;

    return entity;
  }
}
