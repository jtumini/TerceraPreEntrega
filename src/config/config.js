import dotenv from 'dotenv' 

dotenv.config()

export default {
        persistence: process.env.PERSISTENCE || 'FILE',
        mongoURI: process.env.MONGO_URI,
        mongoDBname: process.env.MONGO_DB_NAME,
        url: process.env.MONGO_URL || 'mongodb://localhost:27017',
        mailUser: process.env.MAIL_USER,
        mailPass: process.env.MAIL_PASS
}