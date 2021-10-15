const Repository = require('../infra/repository')
const model = require('../model/state')
const { check } = require('express-validator')
const validate = require('./validator')

const states = new Repository(model)

module.exports = app => {

    app.get('/states', (req, res) => {
        states.findAll()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.get('/states/:id', (req, res) => {
        states.findOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.post('/states',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            states.insert(req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.put('/states/:id',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            states.update(req.params.id, req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.delete('/states/:id', (req, res) => {
        states.remove(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

}