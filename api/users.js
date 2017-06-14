'use strict'

const Status = require('http-status')

module.exports = (app, options) => {
  const {jwt, userRepo} = options

  app.post('/authenticate', (req, res, next) => {
    userRepo.fetch({name: req.body.name}).then((user) => {
      console.log(user)
      if (user.password !== req.body.password) {
        res.status(403).send()
      } else {
        const token = jwt.sign(user, options.secret, {
          expiresIn: '24h' // expires in 24 hours
        })
        res.status(Status.OK).json({token})
      }}).catch((err) => {
        res.status(400).send()
      })
  })
}
