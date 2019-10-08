//Index, show, sstore, updade, destroy
const User = require('../models/User');


module.exports ={
    async store(req, res) {
        const {name, email, telephone} = req.body;

        let user = await User.findOne({email});
        
        if(!user) {
            user = await User.create({name, email, telephone})
        };

        //const user = await User.create({name, email, telephone});

        return res.json(user);
    }
};