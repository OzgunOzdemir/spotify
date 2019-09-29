const UPDATE_SEARCH = 'UPDATE_SEARCH';

const updateSearch = (data) => {
    return {
        type: 'UPDATE_SEARCH',
        payload: {
            data: data
        }
    }

}

export { updateSearch, UPDATE_SEARCH };