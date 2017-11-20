import { Router } from 'express'
import { create, showAll, show, destroy, addScore, substractScore } from './controller'
import filterBody from './middleware/filterBody'

const router = new Router()



//user
//recibe name, influence, difficulty, owner
router.post('/',
    filterBody,
    create)

//admin
router.get('/',
    showAll)

router.get('/:id',
    show)

router.get('/myHabits')

router.get('/myScore')

router.delete('/:id',
    destroy)

router.get('/addScore/:id',
    addScore)

router.get('/substractScore/:id',
    substractScore)

export default router