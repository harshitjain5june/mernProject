import express from 'express';
import { userSchema } from '../../models/users';
import { body, validationResult } from 'express-validator'
const router = express.Router();

router.post('/createuser', body('name').isAlpha(), body('password').isLength({ min: 5 }), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    try {
        await userSchema.create(
            {
                name: req.body.name,
                password: req.body.password,
                location: req.body.location,
                email: req.body.email
            }
        )
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }
})

export { router }

module.exports = router