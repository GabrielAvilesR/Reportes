import admin from 'firebase-admin'
import { firebase, firebaseDB } from '../../config'
admin.initializeApp({
    credential: admin.credential.cert(firebase),
    databaseURL:firebaseDB
})
const DB = admin.database()

export const firebaseAuthUser = (req, res, next) => {
    if(req.body.token){
        admin.auth().verifyIdToken(req.body.token)
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
    if(req.body.token){
        admin.auth().verifyIdToken(req.body.token)
            .then((decodedToken) => {
                DB.ref('users/' + decodedToken.uid).once('value').then(function(snapshot) {
                    console.log(snapshot.val());
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