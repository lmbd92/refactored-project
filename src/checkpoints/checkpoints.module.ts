import { Module } from '@nestjs/common';
import { CheckpointsController } from './presentation/checkpoints.controller';
import { CreateCheckpointService } from './application/services/create-checkpoint.service';
import { GetHistoryService } from './application/services/get-history.service';
import { InMemoryCheckpointRepository } from './infrastructure/persistence/in-memory-checkpoint.repository';
import { CHECKPOINT_REPOSITORY } from './domain/checkpoint.repository';

@Module({
  controllers: [CheckpointsController],
  providers: [
    CreateCheckpointService,
    GetHistoryService,
    { provide: CHECKPOINT_REPOSITORY, useClass: InMemoryCheckpointRepository },
  ],
  exports: [
    CreateCheckpointService,
    GetHistoryService,
    { provide: CHECKPOINT_REPOSITORY, useClass: InMemoryCheckpointRepository },
  ],
})
export class CheckpointsModule {}
