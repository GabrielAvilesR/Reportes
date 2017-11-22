import { Router } from 'express'
import { create, showAll, show, destroy, addScore, substractScore, showAllMine, showMine, deleteMine, myScore } from './controller'
import filterBody from './middleware/filterBody'
import { firebaseAuthUser } from './middleware/firebaseAuth'

const router = new Router()



//user
//recibe name, influence, difficulty, owner
router.post('/',
    firebaseAuthUser,
    filterBody,
    create)
router.get('/myHabits',
    firebaseAuthUser,
    showAllMine)

router.get('/myHabits/:id',
    firebaseAuthUser,
    showMine)

router.delete('/myHabits/:id',
    firebaseAuthUser,
    deleteMine)

router.get('/myScore',
    firebaseAuthUser,
    myScore)

router.delete('/:id',
    firebaseAuthUser,
    destroy)


router.get('/addScore/:id',
    firebaseAuthUser,
    addScore)

router.get('/substractScore/:id',
    firebaseAuthUser,
    substractScore)
//admin
router.get('/',
firebaseAuthUser,
showAll)

router.get('/:id',
firebaseAuthUser,
show)

export default router