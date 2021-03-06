import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import { Order, OrderStatus } from '../../models/order'
import { natsWrapper } from '../../nats-wrapper';
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

it('marks an order as cancelled', async () => {
    // create a ticket with Ticket Model
    const ticket = Ticket.build({
        id: '1',
        title: 'concert',
        price: 20
    });
    await ticket.save();

    // make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .send({ ticketId: ticket.id })
        .expect(201);

    // make a request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .send()
        .expect(204);

    // expectation to make sure the thing is cancelled
    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);

})

it('emits an order cancelled event', async () => {
    const ticket = Ticket.build({
        id: 'awfaw',
        title: 'concert',
        price: 20
    });
    await ticket.save();

    // make a request to create an order
   // const { body: order } = await request(app)
    //    .post('/api/orders')
       // .send({ ticketId: ticket.id })
    //    .expect(201);
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
        userId: '1',
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket
    });

    // make a request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .send()
        .expect(204);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

})