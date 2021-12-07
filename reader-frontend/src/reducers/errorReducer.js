export const addError = ({ errorType, errorString }) => ({
    type: 'ADD_ERROR',
    errorType: errorType,
    data: errorString
})

const errorReducer = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_ERROR':
      return { ...state, [action.errorType]: action.data }
    default:
      return state
  }
}

export default errorReducer

