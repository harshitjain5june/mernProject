import express from 'express';
import { userSchema } from '../../models/users';
import { body, validationResult } from 'express-validator'
const router = express.Router();

router.post('/createuser', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {

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

router.post('/login', body('email').isEmail(), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    try {
        const email = req.body.email;
        const userData=await userSchema.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Invalid credentials"});
        }
        if(req.body.password !== userData.password){
            return res.status(400).json({errors: "Invalid credentials"});
        }

        return res.json({success: true});
       
    } catch (error) {
        console.log(error)
        return res.status(400).json({errors: error});
    }
})

export { router }

module.exports = router