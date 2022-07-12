import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });

    await ticket.save();

    return ticket;
}
it('fetches orders for a particular user', async () => {
    // Create three tickets
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();
    
    const userOne = global.signin();
    const userTwo = global.signin();

    // Create one order as User #1
    await request(app)
        .post('/api/orders')
        .expect(201);
    // Create two orders as User #2
    await request(app)
        .post('/api/orders')
        .expect(201);
    // Make request to get orderes for User #2

    // Make sure we only got the orders for User #2



})