import { Router } from 'express'
import productsModel from '../dao/models/product.models.js'


const router = Router ()

router.get( '/' , async (req, res) => {
    try{    
        let page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 5
        const product = await productsModel.paginate({}, { page, limit, lean: true  })

        result.prevLink = result.hasPrevPage
                        ? `/products?page=${result.prevPage}`
                        : ''
        result.nextLink = result.hasNextPage
                        ? `/products?page=${result.nextPage}`
                        : ''                

        res.render('home' , { product })
    } catch(err){
        res.status(500).json({ status: 'error' , error: err.message })
    }
})


router.get('/realTimeProducts', async (req, res) => {
    try {
        const product = await productsModel.find().lean().exec()
        res.render('realTimeProducts', {product})
    } catch(err) {
        res.status(500).json({ status: 'error', error: err.message})
    }
})
export default router