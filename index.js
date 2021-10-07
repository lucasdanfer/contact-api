const custom = require('./config/custom')

const app = custom()

app.listen(3000, () => console.log('servidor rodando na porta 3000'))