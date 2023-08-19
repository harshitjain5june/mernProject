import express from 'express';
import { userSchema } from '../../models/users';
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const router = express.Router();
const jwtSecret = "HelloIamA#SoftwareEngineer";

router.post('/createuser', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await userSchema.create(
            {
                name: req.body.name,
                password: encryptedPassword,
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
        const userData = await userSchema.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const passCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!passCompare) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }

        const jwtData = {
            user: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(jwtData, jwtSecret)
        return res.json({ success: true, authToken: authToken });

    } catch (error) {
        console.log(error)
        return res.status(400).json({ errors: error });
    }
})

export { router }

module.exports = router