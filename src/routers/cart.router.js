import { Router } from 'express';
import cartModel from '../dao/models/cart.models.js'

const router = Router();


router.get( '/' , async (req, res) => {
    try {
        const carts = await cartModel.find().lean().exec();
        res.status(200).json({ carts });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los carritos' });
    }
})

router.post('/', async (req, res) => {  
    try {
        const newCart = new Cart();
        const savedCart = await newCart.save();
        res.status(200).json({ message: 'Carrito creado exitosamente', cartId: savedCart._id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await cartModel.findById(cartId).lean().exec();
    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }

    res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});


router.post('/:cartId/product/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const cart = await cartModel.findById(cartId).lean().exec();
        const product = await product.findById(productId).lean().exec();

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
    res.status(200).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export default router