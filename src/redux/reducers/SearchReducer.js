import { UPDATE_SEARCH } from '../actions/index';

const searchReducer = (state = {}, { type, payload }) => {
    switch(type){
        case UPDATE_SEARCH:
            return payload.data
        default:
            return state; 
    }
}

export default searchReducer;