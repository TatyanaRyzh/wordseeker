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

const sendmessageMiddleware = store => next => action => {
    if(action.type === 'SendMessage') {
         const command = { type: 'sendMessage' }
         const aggregateId = store.getState().jwt.userId
         const aggregateName = 'chat'
         const time = new Date()
         const hours = getHours(time)
         const minutes = getMinutes(time)

         const username = store.getState().viewModels.users['*'][aggregateId];
        

         const payload = {
             text: action.text, 
             time: hours + ':' + minutes,
             username: username
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
    updateUsernameMiddleware,
    sendmessageMiddleware
]