const UPDATE_USER = 'UPDATE_USER';

const updateUser = (newUser) => {
    return {
        type: 'UPDATE_USER',
        payload: {
            data: newUser
        }
    }

}

export { updateUser, UPDATE_USER };