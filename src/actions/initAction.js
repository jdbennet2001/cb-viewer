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

export const closeArchiveAction = (payload) => dispatch => {
 dispatch({
  type: 'CLOSE_ARCHIVE',
  payload
 })
}

export const nextPageAction = (payload) => dispatch => {
 dispatch({
  type: 'NEXT_PAGE',
  payload
 })
}

export const previousPageAction = (payload) => dispatch => {
 dispatch({
  type: 'PREVIOUS_PAGE',
  payload
 })
}