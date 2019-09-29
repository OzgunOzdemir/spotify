import React, { Component, Fragment } from 'react';

import queryString from 'query-string';
import { getPlaylistByCategory } from '../../services';
import Playlist from '../../components/Ui/Playlist/Playlist';
import Loading from '../../components/Ui/Loading/Loading';

class Playlists extends Component {

    constructor(props) {
        super(props)

        this.state = {
            playList: {},
            loadingShow: true
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem("access_token"); // for refresh page 
        const values = queryString.parse(this.props.location.search);
        const getplayList = await getPlaylistByCategory(token, values.category_id);
        this.setState({
            playList: getplayList.data,
            loadingShow: false
        })
    }

    handlerTrackspage = (item) => {
        let queryString = "id=" + item.id;
        this.props.history.push(`/tracks?${queryString}`);
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.loadingShow === false ?
                        <div className="PageContainer container">
                            <div className="PageTitle">
                                <span className="PageTitleText">Playlist by category</span>
                            </div>
                            <div className="PageContent">
                                <div className="row">
                                    {
                                        this.state.playList.items ?
                                            this.state.playList.items.map((item, i) =>
                                                <Playlist item={item} key={i} onClick={() => this.handlerTrackspage(item)} />
                                            ) : ''
                                    }
                                </div>
                            </div>
                        </div> : <Loading show={this.state.loadingShow} />
                }
            </Fragment>
        )
    }
}

export default Playlists;
