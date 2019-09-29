const UPDATE_AUDIOPLAYER = 'UPDATE_AUDIOPLAYER';

const updateAudioPlayer = (data) => {
    return {
        type: 'UPDATE_AUDIOPLAYER',
        payload: {
            data: data
        }
    }

}

export { updateAudioPlayer, UPDATE_AUDIOPLAYER };