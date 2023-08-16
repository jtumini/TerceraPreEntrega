import { Router } from 'express'
import productModel from '../dao/models/product.models.js'

const router = Router ()

router.get( "/" , async (req, res) => {
    try{
        const limit = req.query.limit || 5
        const products = await productModel.find().lean().exec()
        res.status(200).json({ status: 'succes' , payload: result })
    } catch (err) { 
        res.status(500).json ({status: 'error', error: err.message})
    }   
})  

router.get("/view", async (req, res) => {
    try{
    const products = await productModel.find().lean().exec()
    res.render('realTimeProducts', {
        data: products
    })} catch (err) { 
        res.status(500).json ({status: 'error', error: err.message})
    }   
})

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const result = await productModel.findById(id).lean().exec()
        if (result === null){
            return  res.status(404).json({ status: 'error' , error: 'Not Found'})
        }
        res.status(200).json({ status: 'succes', payload: result})
    }catch (err){
        res.status(500).json({ status: 'error' , error: err.message })
    }
})



router.post('/', async (req, res) => {
    try {
        const productNew = req.body
        const result = await productModel.create(productNew)
        const products = await productModel.find().lean().exec()
        req.io.emit('updateProducts', products)
        res.status(201).json({ status : 'succes' , payload: result})
    }   catch (err){        
        res.status(500).json({ status: 'error', error: err.message })
    }
})


router.put('/:pid', async (req, res) =>{
    try {
        const id= req.params.pid
        const data= req.body
        const result = await productModel.findByIdAndUpdate(id, data, { returnDocument: 'after '})
        if (result === null){
            return res.status(404).json({ status: 'error' , error: 'Not Found'})
        }
        const products = await productModel.find().lean().exec()
        req.io.emit('updateProdudcts', products)
        res.status(200).json({status: 'succes' , payload: result})
    } catch(err){
        res.status(500).json({ status:'error' , error: err.message})
    }
})

router.delete('/:pid', async (req, res) => {
    try{
        const id = req.params.pid
        const result = await productModel.findByIdAndDelete(id)
        if (result === null){
            return res.status(404).json({status: 'error' , error: 'Not Found'})
        }
        const products= await  productsModel.find().lean().exec()
        req.io.emit('updateProdudcts', products)
        res.status(200).json({status: 'succes' , payload: result})
    } catch(err){   
        res.status(500).json({ status:'error' , error: err.message})
    }
})

export default router 
