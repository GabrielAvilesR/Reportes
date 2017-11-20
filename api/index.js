import { Router } from 'express'
import { create, showAll, show, destroy, addScore, substractScore } from './controller'
import filterBody from './middleware/filterBody'
import { firebaseAuthUser, firebaseAuthAdmin } from './middleware/firebaseAuth'

const router = new Router()



//user
//recibe name, influence, difficulty, owner
router.post('/',
    firebaseAuthUser,
    filterBody,
    create)

//admin
router.get('/',
    firebaseAuthAdmin,
    showAll)

router.get('/:id',
    firebaseAuthAdmin,
    show)

router.get('/myHabits')

router.get('/myHabit/:id')

router.delete('/myHabits/:id')

router.get('/myScore')

router.delete('/:id',
    firebaseAuthAdmin,
    destroy)

//cambiarlas
router.get('/addScore/:id',
    addScore)

router.get('/substractScore/:id',
    substractScore)

export default router