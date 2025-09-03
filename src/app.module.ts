import { Module } from '@nestjs/common';
import { CheckpointsModule } from './checkpoints/checkpoints.module';

@Module({
  imports: [CheckpointsModule],
})
export class AppModule {}
