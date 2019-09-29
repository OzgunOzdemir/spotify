import UserReducer from './UserReducer';
import AudioPlayerReducer from './AudioPlayerReducer';
import SearchReducer from './SearchReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
        user: UserReducer,
        audioPlayer: AudioPlayerReducer,
        search: SearchReducer
});


export default rootReducer;