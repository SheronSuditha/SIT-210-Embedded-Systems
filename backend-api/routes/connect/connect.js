const router = require('express').Router();
const User = require('../../models/Users');
const validate = require('../../utils/validation/validate');
const jwt = require('jsonwebtoken')

//post ~ create a user account 
router.post('/register', async (req, res) => {
    const { error } = validate.regValidation(req.body);
    if (error) return res.status(400).json({
        state: false,
        error: error.details[0].message
    })

    const emailExists = await User.findOne({
        email: req.body.email
    })

    if (emailExists) return res.status(403).json({
        message: "Email Already Exists"
    })

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        permLevel: accesslvl
    })

    try {
        const savedUser = await user.save()
        res.status(200).json({
            message: "User Registered!",
            details: savedUser
        })
    } catch (err) {
        res.status(400).json({
            error: err
        });
    }
})

router.post('/login', async (req, res) => {
    const { error } = validate.loginValidation(req.body);
    if (error) return res.status(400).json({
        error: err
    })

    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) return res.status(403).json({
        message: "Invalid Email"
    })

    const token = await jwt.sign({
        _id: user._id,
        access: user.accessLevel
    }, process.env.SECRET_TOKEN)

    return res.header('auth_token', token).status(200).json({
        token: token,
        username: user.name,
        perm_level: user.permLevel,
        id: user._id
    })
})

module.exports = router;