import path from 'path'


export default (state = {}, action={}) => {

	if ( action.type === 'OPEN_ARCHIVE'){
	   return Object.assign({}, state, action.payload, {page: 0});
	}

	return state;

}



