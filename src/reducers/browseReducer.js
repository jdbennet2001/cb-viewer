import path from 'path'


export default (state = {}, action={}) => {

	if ( action.type === 'MODEL_LOAD'){
	   let directory_contents = get_contents(action.payload, action.payload.source_dir);
	   return Object.assign({}, action.payload, directory_contents, {state: 'BROWSING'});
	}
	
	if ( action.type === 'MODEL_UP'){
	   let is_root = state.current_dir === state.source_dir;
	   let new_dir = is_root ? state.source_dir : path.join(state.current_dir, '..' );
	   let directory_contents = get_contents(state, new_dir);
	   return Object.assign({}, state, directory_contents);
	}

	if ( action.type === 'MODEL_DOWN'){
	   let new_dir 		  	  = action.payload;
	   let directory_contents = get_contents(state, new_dir);
	   return Object.assign({}, state, directory_contents);
	}

	if ( action.type === 'MODEL_ROOT'){
	   let new_dir 		  	  = state.source_dir;
	   let directory_contents = get_contents(state, new_dir);
	   return Object.assign({}, state, directory_contents);
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
