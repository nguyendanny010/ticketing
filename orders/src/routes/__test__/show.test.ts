import mongoose from "mongoose";
import request from "supertest";
import { app } from '../../app';
import { Ticket } from "../../models/ticket";

it('fetches the order', async () => {
    // Create the ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    })
    await ticket.save();
    // make a request to build an order with this ticket
    const { body: order } = await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);

    // make eacg request to fetch the order

    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .send()
        .expect(200)

    expect(fetchedOrder.id).toEqual(order.id);
    
})