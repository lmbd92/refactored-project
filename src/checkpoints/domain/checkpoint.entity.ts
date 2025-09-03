export class Checkpoint {
  constructor(
    public readonly id: string,
    public readonly unitId: string,
    public readonly status:
      | 'CREATED'
      | 'IN_TRANSIT'
      | 'DELIVERED'
      | 'CANCELLED',
    public readonly timestamp: Date,
  ) {}
}
