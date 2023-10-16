import UserModel from "../models/user.models";

export default class User {
    get = async() => await UserModel.find()
    create = async(data) => await UserModel.create(data)
    getById = async(id) => await UserModel.findById(id)
    updata = async(id, data) => await UserModel.updateOne({ _id: id }, data)
}