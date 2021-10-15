const Repository = require('../infra/repository')
const model = require('../model/contact')
const { check } = require('express-validator')
const validate = require('./validator')

const contacts = new Repository(model)

module.exports = app => {

    app.get('/contacts', (req, res) => {
        contacts.build()
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.get('/contacts/:id', (req, res) => {
        contacts.buildById(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

    app.post('/contacts',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            contacts.insert(req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.put('/contacts/:id',
        check('name').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            contacts.update(req.params.id, req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.patch('/contacts/:id',
        check('state').not().isEmpty().withMessage('must not be empty'),
        (req, res) => {

            validate(req, (errors) => {
                return res.status(400).json({ errors: errors });
            })

            contacts.patch(req.params.id, req.body)
                .then(result => res.status(200).json(result))
                .catch(error => res.status(500).json(error))
        })

    app.delete('/contacts/:id', (req, res) => {
        contacts.remove(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).json(error))
    })

}