import productModel from "../models/product.models"


export const createProductController = async (req, res) => {
    try {
        const productNew = req.body
        const result = await productModel.create(productNew)
        const products = await productModel.find().lean().exec()
        req.io.emit('updateProducts', products)
        res.status(201).json({ status : 'succes' , payload: result})
    }   catch (err){        
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const filterProductLimit = async (req, res) => {
    try{
        const limit = req.query.limit || 5 
        const products = await productModel.find().lean().exec()
        res.status(200).json({ status: 'succes' , payload: result })
    } catch (err) { 
        res.status(500).json ({status: 'error', error: err.message})
    }   
}

export const filterProductId = async (req, res) => {
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
}

export const viewRealTimeProduct = async (req, res) => {
    try{
    const products = await productModel.find().lean().exec()
    res.render('realTimeProducts', {
        data: products
    })} catch (err) { 
        res.status(500).json ({status: 'error', error: err.message})
    }   
}

export const updateProductController = async (req, res) =>{
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
}

export const deleteProductController =  async (req, res) => {
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
}