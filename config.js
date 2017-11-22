import path from 'path'
import _ from 'lodash'


const requireProcessEnv = (name) => {
    if (!process.env[name]) {
      throw new Error('You must set the ' + name + ' environment variable')
    }
    return process.env[name]
}
  

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv-safe')
    dotenv.load({
        path: path.join(__dirname, './.env'),
        sample: path.join(__dirname, './.env.example')
    })
}

const config = {
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    mongo:{
        uri: process.env.MONGODB_URI || 'mongodb://localhost/habits'
    },
    firebase:{
        projectId: process.env.FIREBASE_PROJECT_ID || undefined,
        clientEmail: process.env.FIREBASE_CLIENT_MAIL || undefined,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') || undefined

    },
    firebaseDB: process.env.FIREBASE_DATABASE_URL || undefined,
    masterKey: process.env.MASTER_KEY || undefined
}

module.exports = config
export default module.exports