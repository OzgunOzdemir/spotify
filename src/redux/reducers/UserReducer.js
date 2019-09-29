import { UPDATE_USER } from '../actions/index';

const userReducer = (state = [], { type, payload }) => {
    switch(type){
        case UPDATE_USER:
            return payload.data;

        default:
            return state; 
    }
}

export default userReducer;