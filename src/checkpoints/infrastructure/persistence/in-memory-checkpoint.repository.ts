import { Injectable } from '@nestjs/common';
import { CheckpointRepository } from '../../domain/checkpoint.repository';
import { Checkpoint } from '../../domain/checkpoint.entity';

@Injectable()
export class InMemoryCheckpointRepository implements CheckpointRepository {
  private checkpoints: Checkpoint[] = [];
  private idempotencyKeys = new Set<string>();

  async save(checkpoint: Checkpoint): Promise<void> {
    await Promise.resolve(this.checkpoints.push(checkpoint));
  }

  async findByUnitId(unitId: string): Promise<Checkpoint[]> {
    return await Promise.resolve(
      this.checkpoints.filter((c) => c.unitId === unitId),
    );
  }

  async existsByIdempotencyKey(key: string): Promise<boolean> {
    return await Promise.resolve(this.idempotencyKeys.has(key));
  }

  registerIdempotencyKey(key: string) {
    this.idempotencyKeys.add(key);
  }
}
