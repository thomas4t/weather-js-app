export class OrderEvent {
  constructor(public readonly id: string) {}
}

export class OrderEventSuccess {
  constructor(public readonly id: string) {}
}

export class OrderEventFail {
  constructor(public readonly id: string, public readonly error: Error) {}
}
