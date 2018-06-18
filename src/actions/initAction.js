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

export const openArchiveAction = (payload) => dispatch => {
 dispatch({
  type: 'OPEN_ARCHIVE',
  payload
 })
}

export const exitReaderAction = (payload) => dispatch => {
  debugger;
 dispatch({
  type: 'EXIT_READER',
  payload
 })
}


export const randomArchiveAction = (payload) => dispatch => {
  debugger;
 dispatch({
  type: 'RANDOM_SELECTION',
  payload
 })
}
