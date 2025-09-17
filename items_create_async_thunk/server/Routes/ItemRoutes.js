const createItemController = require('../Controllers/createItemController')
const deleteItemController = require('../Controllers/deleteItemController')
const getAllItemsController = require('../Controllers/getAllItems')
const updateItemController = require('../Controllers/updateItemController')
const itemsMiddleware = require('../Middlewares/itemsMiddleware')

const itemRouter = require('express').Router()

itemRouter.get('/', getAllItemsController)

itemRouter.post('/createItem', itemsMiddleware, createItemController)

itemRouter.put('/:id', updateItemController)

itemRouter.delete('/:id', deleteItemController)

module.exports = itemRouter