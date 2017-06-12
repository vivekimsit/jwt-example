const dbSettings = () => ({
  database: process.env.DB || 'test',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  host: process.env.DB_HOST || 'localhost'
})

const server = {
  port: process.env.PORT || 3000
}

module.exports = Object.assign({}, {dbSettings, server})
