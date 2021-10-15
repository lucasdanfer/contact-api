const repository = require('../repository/contact')
const { check, validationResult } = require('express-validator')

module.exports = app => {

    app.get('/contacts', (req, res) => {
        repository.findAll()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.get('/contacts/:id', (req, res) => {
        repository.findOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.post('/contacts',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array().map(errorMapper) });
            }

            repository.insert(req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.put('/contacts/:id',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array().map(errorMapper) });
            }

            repository.update(req.params.id, req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.delete('/contacts/:id', (req, res) => {
        repository.remove(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    const errorMapper = e => {
        const error = {}
        error.field = e.param
        error.message = e.msg
        return error
    }
}