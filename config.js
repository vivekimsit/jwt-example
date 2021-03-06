const dbSettings = () => ({
  database: process.env.DB || 'test',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  host: process.env.DB_HOST || 'localhost',
  charset: 'utf8'
})

const server = {
  port: process.env.PORT || 3000,
  secret: 'ilovefoobar'
}

module.exports = Object.assign({}, {dbSettings, server})
