import { Router } from 'express'
import productModel from '../models/product.models.js'
import { createProductController ,
    filterProductLimit ,
    filterProductId,
    viewRealTimeProduct ,
    updateProductController ,
    deleteProductController 
} from '../controllers/product.controller.js'

const router = Router ()

router.get( "/" , filterProductLimit)  
router.get("/view", viewRealTimeProduct)
router.get('/:id', filterProductId)
router.post('/', createProductController)
router.put('/:pid', updateProductController)
router.delete('/:pid', deleteProductController)

export default router 
