const contact = require('../model/contact')

module.exports = app => { 
    app.get('/contacts', (req, res) => res.send('Você está na rota de contatos'))

    app.get('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        res.send('OK');
    })

    app.post('/contacts', (req, res) => {
        contact.add(req.body, res)
    })
}