const Repository = require('../infra/repository')
const model = require('../model/message')
const { check } = require('express-validator')
const validate = require('./validator')

const messages = new Repository(model)

module.exports = app => {

    app.get('/messages', (req, res) => {
        messages.findAll()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.get('/messages/:id', (req, res) => {
        messages.findOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.post('/messages',
        check('type').not().isEmpty().withMessage('must not be empty'),
        check('statement').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            messages.insert(req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.put('/messages/:id',
        check('type').not().isEmpty().withMessage('must not be empty'),
        check('statement').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            messages.update(req.params.id, req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.delete('/messages/:id', (req, res) => {
        messages.remove(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

}