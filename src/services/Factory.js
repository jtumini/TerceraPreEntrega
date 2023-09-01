import MongoDAO from "../dao/MongoDAO";
import UserService from "./User";
import config from "../config/config";  

let dao
switch (config.app.persistence) {
    case 'MONGO':
        dao = new MongoDAO(config.mongo)
        break;

    default:
        break;
}

export default UserService  = new UserService(dao)