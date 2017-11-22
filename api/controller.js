import _ from 'lodash'
import Habit from './model'
import { success, notFound } from './middleware/response'

export const create = ({ body }, res, next) => 
    Habit.create(body)
        .then((habit) => habit.view(true))
        .then(success(res, 201))
        .catch(next)

export const showAll = (req, res, next) => 
    Habit.find()
        .then((habits) => habits.map((habit) => habit.view(true)))
        .then(success(res))
        .catch(next)

export const show = ({ params }, res, next) => 
    Habit.findById(params.id)
        .then(notFound(res))
        .then((habit) => habit.view(true))
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) => 
    Habit.findById(params.id)
        .then(notFound(res))
        .then((habit) => habit.remove())
        .then(success(res, 204))
        .catch(next)

export const addScore = ({ body, params }, res, next) =>
    Habit.findOne({_id:params.id, owner:body.owner})
        .then((habit) => {
            console.log(habit)
            console.log(body, params)
            return habit
        })
        .then(notFound(res))
        .then((habit) => habit.addScore())
        .then((habit) => habit.view(true))
        .then(success(res))
        .catch(next)
export const substractScore = ({ params, body }, res, next) =>
    Habit.findOne({_id:params.id, owner:body.owner})
        .then(notFound(res))
        .then((habit) => habit.substractScore())
        .then((habit) => habit.view(true))
        .then(success(res))
        .catch(next)

export const showMine = ({body}, res, next) => 
    Habit.findOne({owner:body.owner})
        .then((habit) => habit.view(true))
        .then(success(res))
        .catch(next)

export const showAllMine = ({body}, res, next) =>
    Habit.find({owner:body.owner})
        .then(notFound(res))
        .then((habits) => habits.map((habit) => habit.view(true)))
        .then(success(res))
        .catch(next)

export const deleteMine = ({params, body}, res, next) => 
    Habit.findOne({id:params.id, owner:body.owner})
        .then(notFound(res))
        .then((habit) => habit.remove())
        .then(success(res, 204))
        .catch(next)

export const myScore = ({body}, res, next) =>
    Habit.find({owner:body.owner})
        .then((habits) => {
            let result = { score:0}
            for(let i = 0; i < habits.length; i++){
                result.score += habits[i].score
            }
            return result
        })
        .then(success(res))
        .catch(next)