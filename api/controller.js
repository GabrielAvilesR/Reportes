import _ from 'lodash'
import Habit from './model'
import { success, notFound } from './middleware/response'

export const create = ({ body }, res, next) => 
    Habit.create(body)
        .then((habit) => habit.view(false))
        .then(success(res, 201))
        .catch(next)

export const showAll = (req, res, next) => 
    Habit.find()
        .then((banks) => banks.map((bank) => bank.view(true)))
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

export const addScore = ({ params }, res, next) =>
    Habit.findById(params.id)
        .then(notFound(res))
        .then((habit) => habit.addScore())
        .then((habit) => habit.view(true))
        .then(success(res))
        .catch(next)
export const substractScore = ({ params }, res, next) =>
    Habit.findById(params.id)
        .then(notFound(res))
        .then((habit) => habit.substractScore())
        .then((habit) => habit.view(true))
        .then(success(res))
        .catch(next)
