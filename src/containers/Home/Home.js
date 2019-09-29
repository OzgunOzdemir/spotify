import React, { Component, Fragment } from 'react';

import './Home.css';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/index';
import queryString from 'query-string';
import { getMe, getListCategories, getNewReleases } from '../../services/index';
import Category from '../../components/Ui/Category/Category';
import Playlist from '../../components/Ui/Playlist/Playlist';
import Loading from '../../components/Ui/Loading/Loading';

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: {},
            getNewReleasesAlbums: {},
            access_token: null,
            loadingShow: true
        }
    }

    componentDidMount = async () => {
        const sesiontoken = sessionStorage.getItem("access_token");
        // for refresh page
        if (!sesiontoken) {
            const values = queryString.parse(this.props.location.search);
            sessionStorage.setItem("access_token", values.access_token);
            this.setState({
                access_token: values.access_token
            })
        }
        const token = sessionStorage.getItem("access_token");
        // get profile
        const me = await getMe(token);
        this.props.onUpdateUser(me.data);
        //  get categories and get New releases albums
        const getCategories = await getListCategories(token);
        const getNewReleasesAlbums = await getNewReleases(token);
        this.setState({
            categories: getCategories.data,
            getNewReleasesAlbums: getNewReleasesAlbums.data.albums,
            loadingShow: false
        })
    }

    handlerPlaylistspage = (item) => {
        let queryString = "category_id=" + item.id;
        this.props.history.push(`/playlists?${queryString}`);
    }

    handlerTrackspage = (item) => {
        let queryString = "id=" + item.id;
        this.props.history.push(`/albums?${queryString}`);
    }

    handlerPlaylistsFromSearch = (item) => {
        let queryString = "id=" + item.id;
        this.props.history.push(`/tracks?${queryString}`);
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.loadingShow === false ?
                        this.props.search.show === false ?
                            <div className="PageContainer container">
                                <div className="PageContent">
                                    <div className="PageTitle">
                                        <span className="PageTitleText">Categories</span>
                                    </div>
                                    <div className="row">
                                        {
                                            this.state.categories.items ?
                                                this.state.categories.items.map((item, i) =>
                                                    <Category item={item} key={i} onClick={() => this.handlerPlaylistspage(item)} />
                                                ) : ''
                                        }
                                    </div>
                                    <div className="PageTitle">
                                        <span className="PageTitleText">New Releases albums</span>
                                    </div>
                                    <div className="row">
                                        {
                                            this.state.getNewReleasesAlbums.items ?
                                                this.state.getNewReleasesAlbums.items.map((item, i) =>
                                                    <Playlist item={item} key={i} onClick={() => this.handlerTrackspage(item)} />
                                                ) : ''
                                        }
                                    </div>
                                </div>
                            </div> :
                            <div className="PageContainer container">
                                <div className="PageContent">
                                    <div className="PageTitle">
                                        <span className="PageTitleText">Search for Playlists</span>
                                    </div>
                                    <div className="row">
                                        {
                                            this.props.search.playList.items.length > 0 ?
                                                this.props.search.playList.items.map((item, i) =>
                                                    <Playlist item={item} key={i} onClick={() => this.handlerPlaylistsFromSearch(item)}/>
                                                ) : <div className="SearchNotFound">Search result not found...</div>
                                        }
                                    </div>
                                    <div className="PageTitle">
                                        <span className="PageTitleText">Search for Albums</span>
                                    </div>
                                    <div className="row">
                                        {
                                            this.props.search.albums.items.length > 0 ?
                                                this.props.search.albums.items.map((item, i) =>
                                                    <Playlist item={item} key={i} onClick={() => this.handlerTrackspage(item)}/>
                                                ) : <div className="SearchNotFound">Search result not found...</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        : <Loading show={this.state.loadingShow} />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return ({
        search: state.search
    });
}

const mapDispatchToProps = {
    onUpdateUser: updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
