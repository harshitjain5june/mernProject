import express from 'express';
import { orderSchema } from '../../models/orders';
import { Router } from 'express';

const route = Router();

route.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    //If Email exists in db then append order otherwise create
    let eId = await orderSchema.findOne({ 'email': req.body.email })
    

})