export const initAction = (payload) => dispatch => {
 dispatch({
  type: 'MODEL_LOAD',
  payload
 })
}

export const openFolderAction = (payload) => dispatch => {
 dispatch({
  type: 'MODEL_DOWN',
  payload
 })
}

export const openParentFolderAction = (payload) => dispatch => {
 dispatch({
  type: 'MODEL_UP',
  payload
 })
}

export const openRootFolderAction = (payload) => dispatch => {
 dispatch({
  type: 'MODEL_ROOT',
  payload
 })
}