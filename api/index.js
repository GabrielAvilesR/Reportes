import { Router } from 'express'
import { create, showAll, show, destroy, addScore, substractScore, showAllMine, showMine, deleteMine, myScore } from './controller'
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

router.get('/myHabits',
    firebaseAuthUser,
    showAllMine)

router.get('/myHabit/:id',
    firebaseAuthUser,
    showMine)

router.delete('/myHabits/:id',
    firebaseAuthUser,
    deleteMine)

router.get('/myScore',
    firebaseAuthUser,
    myScore)

router.delete('/:id',
    firebaseAuthAdmin,
    destroy)


router.get('/addScore/:id',
    firebaseAuthUser,
    addScore)

router.get('/substractScore/:id',
    firebaseAuthUser,
    substractScore)

export default router