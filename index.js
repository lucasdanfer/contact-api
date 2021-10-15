const custom = require('./config/custom')
require('./infra/database.js')('mongodb://localhost/contact')

const app = custom()

app.listen(3000, () => console.log('servidor rodando na porta 3000'))