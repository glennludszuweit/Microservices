export class GetUserRequest {
  constructor(private readonly userId: string) {}

  toString() {
    return JSON.stringify({ userId: this.userId });
  }
}
