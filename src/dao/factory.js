import config from "../config/config";
import mongoose from "mongoose";

export let User
export let Products


switch (config.persistence) {
    case 'FILE':
        const { default: UserFile } = await import('./user.file')
        const { default: ProductsFile } = await import('./Products.file')
        User = UserFile
        Products = ProductsFile
        break;
    case 'MONGO':
        mongoose.connect(config.mongoURI, {
            dbName: config.mongoDBname
        })
        const { default: UserMongo } = await import('./user.mongo.js')
        const { default: ProductsMongo } = await import('./products.mongo')
        User = UserMongo
        Products = ProductsMongo
        break;

    default:
        break;
}