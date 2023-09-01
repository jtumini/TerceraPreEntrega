import User from '../models/user.models'
import Repository from './Repository'

export default class UserService extends Repository{
    constructor(dao) {
        super (dao, User.model)
    }
}   