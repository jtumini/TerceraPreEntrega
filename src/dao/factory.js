import config from "../config/config";
import mongoose from "mongoose";

export let User
export let Products

mongoose.connect(config.mongoURI,{
    dbName: config.mongoDBname
})
const { default : UserMongo } = await import ('./MongoDAO')
const { default: ProductMongo } = await import ('./MongoDAO')

User = UserMongo
Products = ProductMongo
