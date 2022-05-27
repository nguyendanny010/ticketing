import { Publisher, Subjects, TicketCreatedEvent } from '@dnticketsdn/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
