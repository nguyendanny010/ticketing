import { Subjects, Publisher, OrderCancelledEvent } from '@dnticketsdn/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}