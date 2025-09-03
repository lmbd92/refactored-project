// checkpoints/application/services/create-checkpoint.service.ts
import { Inject, Injectable, ConflictException } from '@nestjs/common';
import {
  CHECKPOINT_REPOSITORY,
  type CheckpointRepository,
} from '../../domain/checkpoint.repository';
import { Checkpoint } from '../../domain/checkpoint.entity';
import { CreateCheckpointDto } from '../dto/create-checkpoint.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateCheckpointService {
  constructor(
    @Inject(CHECKPOINT_REPOSITORY) private readonly repo: CheckpointRepository,
  ) {}

  async execute(
    dto: CreateCheckpointDto,
    idempotencyKey: string,
  ): Promise<Checkpoint> {
    const exists = await this.repo.existsByIdempotencyKey(idempotencyKey);
    if (exists) {
      throw new ConflictException(
        'Duplicate request (idempotency key already used)',
      );
    }

    const checkpoint = new Checkpoint(
      randomUUID(),
      dto.unitId,
      dto.status as Checkpoint['status'],
      new Date(dto.timestamp),
    );

    await this.repo.save(checkpoint);
    await this.repo.registerIdempotencyKey?.(idempotencyKey);

    return checkpoint;
  }
}
