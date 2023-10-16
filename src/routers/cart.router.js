import { Router } from 'express';
import CartManager from "../dao/cart_manager.js"
import cartModel from '../models/cart.models.js'


const CartManager = new CartManager("carts.json")
const router = Router()


router.get( '/' , async (req, res) => {
        const carts = await cartModel.find().lean().exec();
        res.json({carts})
})

router.post('/', async (req, res) => {  
        const newCart = await cartModel.create();
        res.json({status: "succes", newCart});
})


router.get('/:id', async (req, res) => {
        const id = req.params.id;
        const cart = await cartModel.findOne({_id: id})
        res.json({cart})
})


router.post("/:cid/product/:pid", async (req, res) => {
        const { cartID, productID } = req.params;
        const cart = await cartModel.findById(cartID).lean().exec();
        const product = await product.findById(productID).lean().exec();

    if (!cart || !product) {
        res.status(404).json({ error: 'Carrito o producto no encontrado' });
        return;
    }

    const existingProduct = cart.products.find((p) => p.product.toString() === productId);
        if (existingProduct) {
        existingProduct.quantity += 1;
        } else {
        cart.products.push({ product: productId, quantity: 1 });
        }

    await cart.save();
    try {res.status(200).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid

    const cart = await cartModel.findById(cartID)
    if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})

    const productIDX = cart.products.findIndex(p => p.id == productID)
    
    if (productIDX <= 0) return res.status(404).json({status: "error", error: "Product Not Found on Cart"})

    cart.products = cart.products.splice(productIDX, 1)
    await cart.save()
    
    res.json({status: "Success", cart})
});

export default router