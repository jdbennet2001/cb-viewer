export const initAction = (payload) => dispatch => {
 dispatch({
  type: 'MODEL_LOAD',
  payload
 })
}