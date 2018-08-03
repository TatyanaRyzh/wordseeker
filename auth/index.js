import { Strategy } from 'passport-local'
import jwt from 'jsonwebtoken'
import jwtSecret from './jwtSecret'

const strategyOptions = {
  strategy: {
    usernameField: 'username',
    passwordField: 'username',
    successRedirect: null
  }
}

const routes = [
  {
    path: '/register',
    method: 'POST',
    callback: async (req) => {
      const username = req.body.username
      const userId = req.body.userId

      await req.resolve.executeCommand({
        type: 'createUser',
        aggregateId: userId,
        aggregateName: 'user',
        payload: {
          username, userId
        }
      })

      return jwt.sign(
        {
          username: username,
          userId: userId
        },
        jwtSecret
      )
    }
  },
  {
    path: '/logout',
    method: 'POST',
    callback: async () => {
      return jwt.sign({}, jwtSecret)
    }
  }
]

const options = routes.map(({ path, method, callback }) => ({
  ...strategyOptions,
  route: {
    path,
    method
  },
  callback
}))

const strategyConstructor = options =>
  new Strategy(
    {
      ...options.strategy,
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      try {
        done(null, await options.callback(req, username, password))
      } catch (error) {
        done(error)
      }
    }
  )

const strategies = options.map(options => ({
  options,
  strategyConstructor
}))

export default strategies
