export default (state = {}, action) => {
 switch (action.type) {
  case 'MODEL_LOAD':
   return Object.assign({}, action.payload, {current_dir: action.payload.source_dir});
  default:
   return state
 }
}