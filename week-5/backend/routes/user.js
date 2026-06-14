const { Router } = require('express');
const router = Router();
const { UserModel, zodUserSchema } = require('../db/schemas')

router.post("/add", async (req, res)=>{
    const { name, description, interests, socials } = req.body;
    const payload = {
        name,
        description,
        interests,
        socials
    };
    const result = zodUserSchema.safeParse(payload);

    if (!(result.success)){
        return res.status(400).json({
            message: "Invalid inputs"
        })
    }

    const userExists = await UserModel.findOne( {name, description} );
    if (userExists){
        return res.status(400).json({
            message: "user already exists!"
        });
    }

    try{
        await UserModel.create(payload);
    }
    catch(e){
        return res.status(500).json({
            message: "Invalid data!"
        })
    }
    return res.json({
        message: "User added"
    })
});

router.get("/showall", async (req, res)=>{
    const userData = await UserModel.find();
    return res.json(userData);
});

router.post("/delete", async (req, res)=>{
    const { _id } = req.body;

    try{
        const userDeleted = await UserModel.findOneAndDelete({_id});
        if (userDeleted)
            return res.json({
                message: "User deleted"
            })
    }catch(e){
            return res.json({
                message: "User not found with matching ID"
            })
    }
});


module.exports = router;