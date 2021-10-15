const { validationResult } = require('express-validator')

const validate = (req, callback) => {

    const validation = validationResult(req);

    if (!validation.isEmpty()){
        return callback(validation.array().map(errorMapper))
    }

    return validation

}

const errorMapper = e => {
    const error = {}
    error.field = e.param
    error.message = e.msg
    return error
}

module.exports = validate