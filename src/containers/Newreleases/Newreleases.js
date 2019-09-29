import React, { Component, Fragment } from 'react';

import { getNewReleases } from '../../services';
import Playlist from '../../components/Ui/Playlist/Playlist';
import Loading from '../../components/Ui/Loading/Loading';

class Newreleases extends Component {

    constructor(props) {
        super(props)

        this.state = {
            albums: {},
            loadingShow: true
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem("access_token");
        const getAlbums = await getNewReleases(token);
        this.setState({
            albums: getAlbums.data.albums,
            loadingShow: false
        })
    }

    handlerTrackspage = (item) => {
        let queryString = "id=" + item.id;
        this.props.history.push(`/albums?${queryString}`);
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.loadingShow === false ?
                        <div className="PageContainer container">
                            <div className="PageTitle">
                                <span className="PageTitleText">New Releases albums</span>
                            </div>
                            <div className="PageContent">
                                <div className="row">
                                    {
                                        this.state.albums.items ?
                                            this.state.albums.items.map((item, i) =>
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

export default Newreleases;
