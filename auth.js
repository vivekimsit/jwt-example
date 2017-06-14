'use strict'

module.exports = (options) => {
  const {jwt} = options
  return (req, res, next) => {
    const token = req.body.token || req.params.token || req.headers['x-access-token']
      if (!token) {
        res.status(403).send()
      } else {
        jwt.verify(token, options.secret, function (err, decoded) {
          if (err) {
            return res.status(400).json({ message: 'Failed to authenticate token.' })
          } else {
            req.user = decoded
            next()
          }
        })
      }
  }
}
