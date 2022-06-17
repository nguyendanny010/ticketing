import { Publisher, Subjects, TicketUpdatedEvent } from '@dnticketsdn/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
