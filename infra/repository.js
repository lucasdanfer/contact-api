 function Repository (model) {
    
    this.model = model
    
    this.findAll = () => model.find().exec()

    this.findOne = _id => model.findById(_id).exec()

    this.insert = req => model.create(req)

    this.update = (_id, req) => model.findByIdAndUpdate(_id, req).exec()

    this.remove = _id => model.remove({"_id" : _id}).exec()

    this.build = () => model.find().populate({
        path: 'modules',
        populate: {
            path: 'states',
            populate: {
                path: 'messages'
            }
        }
    }).exec()

    this.buildById = _id => model.findById(_id).populate({
        path: 'modules',
        populate: {
            path: 'states',
            populate: {
                path: 'messages'
            }
        }
    }).exec()

}

module.exports = Repository