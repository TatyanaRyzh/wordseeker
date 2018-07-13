import { actions } from 'resolve-redux'

const updateUsernameMiddleware = store => next => action => {
   if(action.type === 'UsernameUpdated') {
        const command = { type: 'updateUsername' }
        const aggregateId = store.getState().jwt.userId
        const aggregateName = 'user'
        const payload = {
            username: action.username
        };

        store.dispatch(actions.sendCommand({
            command,
            aggregateId,
            aggregateName,
            payload
        }))
   }

    return next(action)
  }

export default [
    updateUsernameMiddleware
]