import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from "@dnticketsdn/common";
import mongoose from 'mongoose';
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // create and instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client);
    // create a fake data event
    const data: TicketCreatedEvent['data'] = {
        version: 0,
        id:  new mongoose.Types.ObjectId().toHexString();
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString();
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg };
};
it('creates and saves a ticket', async () => {
    const { listener, data, msg } = await setup();

    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);
    // write assertions to make sure a ticket was created
    const ticket = await Ticket.findById(data.id);
    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
});

it('acknowledges the message', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
});