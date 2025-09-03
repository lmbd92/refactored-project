/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsUUID, IsISO8601, IsIn } from 'class-validator';

export class CreateCheckpointDto {
  @IsUUID()
  unitId: string;

  @IsIn(['CREATED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'])
  status: string;

  @IsISO8601()
  timestamp: string;
}
