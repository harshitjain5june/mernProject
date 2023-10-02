import { orderSchema } from '../../models/orders';
import { Router } from 'express';

const router = Router();

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    //If Email exists in db then append order otherwise create
    let eId = await orderSchema.findOne({ 'email': req.body.email })
    if (eId === null) {
        try {
            await orderSchema.create({
                email: req.body.email,
                order_data: data
            }).then(() => {
                res.json({ success: true })
            })
        }
        catch (error) {
            console.log("error occured : ", error)
        }
    }
    else {
        try {
            await orderSchema.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } }).then(() => {
                res.json({ success: true })
            })
        }
        catch (error) {
            console.log("error occured : ", error)
        }
    }

})

module.exports = router