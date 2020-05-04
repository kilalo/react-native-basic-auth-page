// STATE
const initialState = { 
  isLoggedIn: false,
  user: {},
}

// REDUCERS
function toggleLogin(state = initialState, action) {
	let newState, appState
	switch (action.type) {
		case 'TOGGLE_LOGIN':
      appState = {
        isLoggedIn: true,
        user: action.value.user
      }
      newState = { ...state, ...appState }
      return newState || state
    case 'TOGGLE_LOGOUT':
        appState = {
          isLoggedIn: false,
          user: {}
        }
        newState = { ...state, ...appState }
        return newState || state
		default:
			return state
	}
}

export default toggleLogin