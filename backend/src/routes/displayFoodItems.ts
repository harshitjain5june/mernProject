import express from 'express';
const router = express.Router();

declare const global: {
    food_items: Object[];
    foodCategory: Object[];
};
router.get('/displayFoodItems', async (req, res) => {
    try {
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports=router;