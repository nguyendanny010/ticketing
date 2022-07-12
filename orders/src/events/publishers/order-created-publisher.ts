import { Publisher, OrderCreatedEvent, Subjects } from '@dnticketsdn/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}