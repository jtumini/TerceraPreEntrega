import productModel from "../models/product.models";

export default class Products {
    get = async() => await productModel.find()
    create = async(data) => await productModel.create(data)
    getById = async(id) => await productModel.findById(id)
    updata = async(id, data) => await productModel.updateOne({ _id: id }, data)
}