import { Checkpoint } from './checkpoint.entity';

export interface CheckpointRepository {
  save(checkpoint: Checkpoint): Promise<void>;
  findByUnitId(unitId: string): Promise<Checkpoint[]>;
  existsByIdempotencyKey(key: string): Promise<boolean>;
  registerIdempotencyKey?(key: string): Promise<void>;
}
export const CHECKPOINT_REPOSITORY = Symbol('CheckpointRepository');
