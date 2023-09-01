import mongoose from "mongoose";
import User from '../models/user.models'
import Product from '../models/product.models'

export default class MongoDAO{ 
    constructor(config) {



// EL DAO SE CONECTA A LA BASE DE DATOS:
        this.mongoose = mongoose.connect(config.url, {
            useNewUrlParser: true
        }).catch (err => { 
            console.log(err)
            process.exit()
        })

        const timestamp = {
            timestamp: {
                createdAt: 'created_at',
                updateAt: 'update_at'
            }
        }

        const userSchema = mongoose.Schema(User.Schema,timestamp)
        const ProductSchema = mongoose.Schema(Product.schema, timestamp)
        this.models = {
            [User.model]:mongoose.model(User.model, userSchema),
            [Product.model]:mongoose.model(Product.model, ProductSchema)
        }
    }
}