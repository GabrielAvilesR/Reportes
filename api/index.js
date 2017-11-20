import { Router } from 'express'

const router = new Router()
    

router.post('/')

router.get('/', (req, res) => {
    res.status(200).send("HELLO")
})

router.get('/:id')

router.get('/myHabits')

router.delete('/:id')

router.put('/addScore/:id')

router.put('/substractScore/:id')

export default router