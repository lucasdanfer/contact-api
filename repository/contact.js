const model = require('../model/contact')

const findAll = () => model.find().exec()

const findOne = _id => model.findById(_id).exec()

const insert = contact => model.create(contact)

const update = (_id, contact) => model.findByIdAndUpdate(_id, contact).exec()

const remove = _id => model.remove({"_id" : _id}).exec()

module.exports = {
    findAll,
    findOne,
    insert,
    update,
    remove
}