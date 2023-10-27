export class OrderCreatedEvent {
  constructor(
    readonly orderId: string,
    readonly userId: string,
    readonly price: number,
  ) {}
}
