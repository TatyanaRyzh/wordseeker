const secretKey = 'LKNFo0e59n8t90w3n8ct90aw4nt09wa4n8rx90cn3a9r'

function mainSaga({ resolve: { executeCommand, executeViewModelQuery, subscribeByEventType } }) {
  ((async () => {
    const state = await executeViewModelQuery({
      modelName: 'board',
      aggregateIds: ['root']
    })
    if(!state.hasOwnProperty('board')) {
      await executeCommand({
        aggregateId: 'root',
        aggregateName: 'board',
        type: 'buildBoard',
        payload: secretKey
      })
    }
    
    let flowPromise = Promise.resolve()
    
    await subscribeByEventType(['SELECT_WORD'], () => {
      flowPromise = flowPromise.then(async () => {
        const state = await executeViewModelQuery({
          modelName: 'board',
          aggregateIds: ['root']
        })
            
        if(state.allWordsCount <= state.selectedWords.length) {
          await executeCommand({
            aggregateId: 'root',
            aggregateName: 'board',
            type: 'buildBoard',
            payload: secretKey

          })
        }
            
      })
    })
      
  })()).catch(error => {
    // eslint-disable-next-line no-console
    console.log('Saga error:', error)
  })
}

export default [mainSaga]
