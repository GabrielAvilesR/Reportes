import admin from 'firebase-admin'
import { firebase, firebaseDB, masterKey } from '../../config'
admin.initializeApp({
    credential: admin.credential.cert(firebase),
    databaseURL:firebaseDB
})
const DB = admin.database()

export const firebaseAuthUser = (req, res, next) => {
    if(req.query.masterKey && masterKey === req.query.masterKey){
        req.body.owner = "El Amo Zabdiel"
        next()
        return
    }
    let token;
    if(req.body.token) {
        token = req.body.token
    }else if(req.query.token){
        token = req.query.token
    }
    if(token){
        admin.auth().verifyIdToken(token)
            .then((decodedToken) => {
                DB.ref('users/' + decodedToken.uid).once('value').then(function(snapshot) {
                    if(snapshot.val().role == 'user'){
                        req.body.owner = decodedToken.uid;  
                        next()
                    }else{
                        res.status(401).send("Solo es para users")
                    }
                })
            })
            .catch((err) => {
                res.status(401).send("Token no valido")
            })
    }else{
        res.status(401).json({
            message:"Necesita mandar un token de sesion para acceder a este endpoint"
        })
    }
}
export const firebaseAuthAdmin = (req, res, next) => {
    let token;
    if(req.body.token) {
        token = req.body.token
    }else if(req.query.token){
        token = req.query.token
    }
    if(token){
        admin.auth().verifyIdToken(token)
            .then((decodedToken) => {
                DB.ref('users/' + decodedToken.uid).once('value').then(function(snapshot) {
                    if(snapshot.val().role == 'admin'){
                        next()
                    }else{
                        res.status(401).send("Solo es para admins")
                    }
                })
            })
            .catch((err) => {
                res.status(401).send("Token no valido")
            })
    }else{
        res.status(401).json({
            message:"Necesita mandar un token de sesion para acceder a este endpoint"
        })
    }
}