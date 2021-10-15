function Repository(model) {

    this.model = model

    this.findAll = () => model.find().exec()

    this.findOne = _id => model.findById(_id).exec()

    this.insert = req => model.create(req)

    this.update = (_id, req) => model.findByIdAndUpdate(_id, req).exec()

    this.patch = (_id, req) =>
        model.findById(_id).exec()
            .then(result => {
                result.states.push(req.state)
                model.findByIdAndUpdate(_id, result).exec()
            })
            .catch(error => console.log(error))

    this.remove = _id => model.remove({ "_id": _id }).exec()

    this.build = () => model.find().populate({
        path: 'states',
        populate: {
            path: 'messages'
        }, 
        populate: {
            path: 'options'
        }
    }).exec()

    this.buildById = _id => model.findById(_id).populate({
        path: 'states',
        populate: {
            path: 'messages'
        }, 
        populate: {
            path: 'options'
        }
    }).exec()

}

module.exports = Repository