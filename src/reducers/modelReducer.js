import path from 'path'


export default (state = {}, action={}) => {

	if ( action.type === 'MODEL_LOAD'){
	   let directory_contents = get_contents(action.payload, action.payload.source_dir);
	   return Object.assign({}, action.payload, directory_contents, {state: 'BROWSING'});
	}

	if ( action.type === 'OPEN_ARCHIVE'){
	   return Object.assign({}, state, {state: 'READING'});
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
