const router = require('express').Router();
const auth = require('../middlewares/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res, next) => {
    try {
        const users = await User.findAll();

        res.status(200).json(users);
    } catch (err){
        console.log(err);
    };
});

router.get('/:id', auth, async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);

        if (!user){
            return res.status(404).json({message: 'User not found!'});
        };

        const {password, ...userData} = user.dataValues;

        res.status(200).json(userData);
    } catch (err){
        console.log(err);
    };
});

router.put('/:id', auth, async (req, res, next) => {
    const id = req.params.id;
});

module.exports = router;