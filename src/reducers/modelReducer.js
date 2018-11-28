import path from 'path'
import _ 		from 'lodash'

const 	MAX_HISTORY_SIZE = 20;

export default (state = {}, action={}) => {

	if ( action.type === 'MODEL_LOAD'){
		let dir = action.payload.source_dir;
		let state = action.payload;
		//Map folders from a string to an object, TODO: Should the server do this?
		let folders = action.payload.folders.map(folder =>{
			return {directory: folder};
		})
		folders = get_folders(folders, dir);
		let archives = get_archives(state.archives, dir);
	   	return Object.assign({}, action.payload, {archives, folders, state: 'BROWSING', current_dir: dir});
	}

	if ( action.type === 'MODEL_UP'){
	   	let is_root  = state.current_dir === state.source_dir;
	   	let dir      = is_root ? state.source_dir : path.join(state.current_dir, '..' );
		let archives = get_archives(state.archives, dir);
		let folders  = get_folders(state.folders, dir);
	   	return Object.assign({}, state, {archives, folders, state: 'BROWSING', current_dir: dir});
	}

	if ( action.type === 'MODEL_DOWN'){
	   	let dir      = action.payload;
		let archives = get_archives(state.archives, dir);
		let folders  = get_folders(state.folders, dir);
	   	return Object.assign({}, state, {archives, folders, state: 'BROWSING', current_dir: dir});

	}

	if ( action.type === 'MODEL_ROOT'){
	   	let dir      = state.source_dir;
		let archives = get_archives(state.archives, dir);
		let folders  = get_folders(state.folders, dir);
	   	return Object.assign({}, state, {archives, folders, state: 'BROWSING', current_dir: dir});
	}


	if ( action.type === 'OPEN_ARCHIVE'){

	   let current_dir = action.payload.directory;

	   let archives = get_archives(state.archives, current_dir);
	   let folders  = get_folders(state.folders, current_dir);

		 let history = window.localStorage.getItem('archive-history');
				 history = (history) ? JSON.parse(history) : [];
				 history.push(action.payload.name);
				 history = _.takeRight(history, MAX_HISTORY_SIZE);
			window.localStorage.setItem('archive-history', JSON.stringify(history));

	   //Mark opened archive as 'read'
	   archives = archives.map(archive =>{
	   		let read = (action.payload.name === archive.name) || archive.read;
	   		let open = (action.payload.name === archive.name);
	   		return Object.assign({}, archive, {read, open});
	   })

	   //Switch the UI into Reading mode
	   return  Object.assign({}, state, {state: 'READING', archives, folders, current_dir});
	}

	if ( action.type === 'EXIT_READER'){
	   return Object.assign({}, state, {state: 'BROWSING'});
	}

	if ( action.type === 'RANDOM_SELECTION'){

		let archives = state.archives.map(archive =>{
			return Object.assign({}, archive, {visible:false});
		})

		for (var i = 0; i < 20; i++) {
			 let update =  Math.floor(Math.random() * Math.floor(archives.length));
 			 archives[update].visible = true;
		}

		let folders  = state.folders.map(folder => {
			return Object.assign({}, folder, {visible:false});
		})
	   	return Object.assign({}, state, {archives, folders, state: 'BROWSING'});
	}

	if ( action.type === 'HISTORY_SELECTION'){

		let history = window.localStorage.getItem('archive-history');
			  history = (history) ? JSON.parse(history) : [];

		let archives = state.archives.map(archive =>{
			if ( history.includes(archive.name) ){
				return Object.assign({}, archive, {visible:true});
			}else{
				return Object.assign({}, archive, {visible:false});
			}
		})

		let folders  = state.folders.map(folder => {
			return Object.assign({}, folder, {visible:false});
		})

   	return Object.assign({}, state, {archives, folders, state: 'BROWSING'});
	}


	return state;

}

function get_folders(folders, directory){


	let mapped = folders.map(folder =>{
		let parent_folder = path.join(folder.directory, '..');
		let visible =  (parent_folder === directory);
		return Object.assign({}, folder, {visible});
	})

	return mapped;
}

function get_archives(archives, directory){

	let mapped = archives.map(archive =>{

		let visible =  (archive.directory === directory);
		let {name} = archive;
		return Object.assign({}, archive, {visible});
	})

	let results = mapped.filter(archive =>{
		return archive.visible;
	})

	return mapped;
}
