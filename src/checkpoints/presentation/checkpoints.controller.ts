import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCheckpointDto } from '../application/dto/create-checkpoint.dto';
import { CreateCheckpointService } from '../application/services/create-checkpoint.service';
import { GetHistoryService } from '../application/services/get-history.service';

@Controller('checkpoints')
export class CheckpointsController {
  constructor(
    private readonly createCheckpoint: CreateCheckpointService,
    private readonly getHistory: GetHistoryService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Body() dto: CreateCheckpointDto,
    @Headers('Idempotency-Key') idempotencyKey: string,
  ) {
    return this.createCheckpoint.execute(dto, idempotencyKey);
  }

  @Get(':unitId')
  async history(@Param('unitId') unitId: string) {
    return this.getHistory.execute(unitId);
  }
}
