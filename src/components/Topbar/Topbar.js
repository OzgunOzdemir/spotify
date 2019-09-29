import React, { Component } from 'react';

import './Topbar.css';
import { connect } from 'react-redux';
import { updateSearch } from '../../redux/actions/index';
import InputComponent from '../Ui/Input/Input.js';
import { getSearchByAlbums, getSearchByPlaylist } from '../../services';

class topbar extends Component {

    state = {
        search: '',
    }

    onChange = async (e) => {
        const token = sessionStorage.getItem("access_token");
        const value = e.target.value;
        if (e.target.value.length >= 3) {
            const searchAlbums = await getSearchByAlbums(token, value);
            const searchPlaylist = await getSearchByPlaylist(token, value);
            const searchData = {
                show: true,
                albums: searchAlbums.data.albums,
                playList: searchPlaylist.data.playlists
            }
            this.props.onUpdateSearch(searchData);
        } else {
            const searchData = {
                show: false,
                albums: {},
                playList: {}
            }
            this.props.onUpdateSearch(searchData);
        }
    }

    render() {
        return (
            <div className="Topbar">
                <div className="Right">
                    <div className="HeaderRight">
                        <InputComponent type="text" id="search" name="search" onChange={this.onChange} placeholder="Search" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onUpdateSearch: updateSearch,
}


export default connect(null, mapDispatchToProps)(topbar);