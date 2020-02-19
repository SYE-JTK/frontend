

const session = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERID':
      return (
        {currentUser: action.payload}
      )
    case 'SET_CURRENT_CONVO':
      return (
        {
          ...state,
          currentUser2: action.payload
        }
      )
    default:
      return state
  }
}

export default session
