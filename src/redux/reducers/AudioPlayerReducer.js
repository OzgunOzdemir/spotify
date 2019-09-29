import { UPDATE_AUDIOPLAYER } from '../actions/index';

const audioPlayerReducer = (state = {}, { type, payload }) => {
    switch(type){
        case UPDATE_AUDIOPLAYER:
            return payload.data
        default:
            return state; 
    }
}

export default audioPlayerReducer;