import mongoose, { MongooseError } from "mongoose";


const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            }
        }],
        default: []
    }
})  

cartSchema.pre('findOne', function() {
    this.populate('products.product')
})  

mongoose.set('strictQuery' , false)
const cartModel = mongoose.model('carts' , cartSchema)

export default cartModel
