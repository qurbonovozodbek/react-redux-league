const defaultState = {
    counter: 0
}
export function counterReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD':
            return {
              ...state,
                counter: state.counter + 1
            }
        case 'DELETE':
            return {
              ...state,
                counter: state.counter - 1
            }
        case 'RESET':
            return {
              ...state,
                counter: action.payload
            }
        default:
            return state
    }
}