import { createStore } from 'redux';

import rootReducer from '../reducers/index';

const store = createStore(rootReducer,
    {
        user: [],
        audioPlayer: {},
        search: {
            show: false,
            albums: {},
            playList: {}
        }
    },
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;