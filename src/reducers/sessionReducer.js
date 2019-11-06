
const initalState = {
  currentUser: null
}

const session = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_USERID':
      return (
        {
          currentUser: action.currentUser,
        }
      )
    default:
      return state
  }
}

export default session
