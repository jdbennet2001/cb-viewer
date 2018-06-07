import path from 'path'


export default (state = {}, action={}) => {

	if ( action.type === 'MODEL_LOAD'){
	   return Object.assign({}, action.payload, {state: 'BROWSING'});
	}

	if ( action.type === 'OPEN_ARCHIVE'){

	   //Mark opened archive as 'read'
	   let archives = state.archives.map(archive =>{
	   		let read = (action.payload.name === archive.name) || archive.read;
	   		return Object.assign({}, archive, {read});
	   })

	   //Switch the UI into Reading mode
	   let new_state =  Object.assign({}, state, {state: 'READING', archives});
	   return new_state;
	}

	if ( action.type === 'EXIT_READER'){
	   return Object.assign({}, state, {state: 'BROWSING'});
	}
	
	
	return state;

}

/* Return all folders and archives inside a given directory */
function get_contents(state, directory){

	let folders = state.folders.filter(folder =>{
		let parent_folder = path.join(folder, '..');
		return parent_folder === directory;
	})

	let archives = state.archives.filter(archive =>{
		return archive.directory === directory;
	})

	return {current_dir: directory, current_folders: folders, current_archives: archives};
}
