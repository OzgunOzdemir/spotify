import axios from 'axios/index';

const url ="https://api.spotify.com/v1";

const getHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
    }

    return headers;
}

const getMe = async (token) => {
    const headers = await getHeaders(token);
    const data = [];
    await axios.get(url + '/me', { headers: headers })
        .then((response) => {
            data.push(response.data);
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getListCategories = async (token) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/browse/categories', { headers: headers })
        .then((response) => {
            data = Object.assign({},response.data.categories)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getPlaylistByCategory = async (token, category_id) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/browse/categories/' + category_id + '/playlists', { headers: headers })
        .then((response) => {
            data = Object.assign({},response.data.playlists)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getPlayList = async (token, id) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/playlists/' + id , { headers: headers })
        .then((response) => {
            data = Object.assign({},response.data)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getTracksByPlayList = async (token, id) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/playlists/' + id + '/tracks', { headers: headers })
        .then((response) => {
            data = Object.assign({},response.data)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getNewReleases = async (token) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/browse/new-releases', { headers: headers })
        .then((response) => {
            data = Object.assign({},response.data)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getAlbumsById = async (token, id) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/albums/' + id , { headers: headers })
        .then((response) => {
            data = Object.assign({},response.data)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getTracksByAlbums = async (token, id) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/albums/' + id + '/tracks', { headers: headers })
        .then((response) => {
            data = Object.assign({},response.data)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getSearchByAlbums = async (token, value) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/search',{ 
        params: {
        'q': value,
        'type': 'album'
      }, headers: headers })
        .then((response) => {
            data = Object.assign({},response.data)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

const getSearchByPlaylist = async (token, value) => {
    const headers = await getHeaders(token);
    let data = {};
    await axios.get(url + '/search',{ 
        params: {
        'q': value,
        'type': 'playlist'
      }, headers: headers })
        .then((response) => {
            data = Object.assign({},response.data)
        })
        .catch((error) => {
            return {
                status: 'error',
                message: error.response.data.error.message
            }
        })
    return {
        status: 'success',
        data: data
    }
}

export { getHeaders, getMe, getListCategories, getPlaylistByCategory, getPlayList, getTracksByPlayList, getNewReleases, getAlbumsById, getTracksByAlbums, getSearchByAlbums, getSearchByPlaylist };