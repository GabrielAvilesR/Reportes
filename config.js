const config = {
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    mongo:{
        uri: process.env.MONGODB_URI || 'mongodb://localhost/habits'
    } 
}

module.exports = config
export default module.exports