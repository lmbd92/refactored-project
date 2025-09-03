import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CHECKPOINT_REPOSITORY,
  type CheckpointRepository,
} from '../../domain/checkpoint.repository';
import { Checkpoint } from '../../domain/checkpoint.entity';

@Injectable()
export class GetHistoryService {
  constructor(
    @Inject(CHECKPOINT_REPOSITORY) private readonly repo: CheckpointRepository,
  ) {}
  async execute(unitId: string): Promise<Checkpoint[]> {
    const checkpoints = await this.repo.findByUnitId(unitId);
    if (checkpoints.length === 0) {
      throw new NotFoundException('No checkpoints found for this unitId');
    }
    return checkpoints;
  }
}
