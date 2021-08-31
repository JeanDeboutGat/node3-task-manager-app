const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')



router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }

})


router.post('/users',async (req,res)=>{

    const user = new User(req.body)
    
    try {
        await user.save()
        const token =  await user.generateAuthToken()

        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/login', async (req, res) => {
     const {email, password} = req.body
     try{
        const user =  await User.findByCredentials(email, password)
        const token =  await user.generateAuthToken()

        res.send({ user, token})

     }catch(e){
        res.status(400).send()
     }
    
 })

router.post('/users/logout',auth, async (req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter( (token) => { return token.token !== req.token })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }

})

router.post('/users/logoutAll',auth, async (req, res) =>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()

    }
})

router.get ('/users/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const user = await User.findById(_id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)      
    } catch (e) {
        res.status(500).send()

    }
})

router.patch('/users/me',auth, async function (req, res){

    const allowedFields = ["name", "age", "email", "password"]
    const givenFields   = Object.keys(req.body)

    const areFieldsValid = givenFields.every(field => allowedFields.includes(field))

    if (!areFieldsValid){
        return res.status(400).send()
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true})

       const r = await req.user.updateOne({ _id : req.user._id}, { name: "cggddx"})
        await req.user.save()
        console.log(r.n)
        res.send(req.user)     
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router