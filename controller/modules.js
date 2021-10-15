const Repository = require('../infra/repository')
const model = require('../model/module')
const { check } = require('express-validator')
const validate = require('./validator')

const modules = new Repository(model)

module.exports = app => {

    app.get('/modules', (req, res) => {
        modules.findAll()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.get('/modules/:id', (req, res) => {
        modules.findOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.post('/modules',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            modules.insert(req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.put('/modules/:id',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            modules.update(req.params.id, req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.delete('/modules/:id', (req, res) => {
        modules.remove(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

}