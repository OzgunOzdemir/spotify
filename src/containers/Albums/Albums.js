import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { updateAudioPlayer } from '../../redux/actions/index';
import { getAlbumsById, getTracksByAlbums } from '../../services/index';
import queryString from 'query-string';
import Button from '../../components/Ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../components/Ui/Loading/Loading';
import { Helmet } from "react-helmet";

class Albums extends Component {

    constructor(props) {
        super(props)

        this.state = {
            albums: {},
            albumsDetail: {},
            curentAuidoPlayer: {
                name: null,
            },
            loadingShow: true
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem("access_token");
        const values = queryString.parse(this.props.location.search);
        const albumsDetail = await getAlbumsById(token, values.id);
        const albums = await getTracksByAlbums(token, values.id);   
        this.setState({
            albumsDetail: albumsDetail.data,
            albums: albums.data,
            loadingShow: false
        })
    }

    playHandler = (item) => {
        const audioPlayer = {
            play: true,
            url: item.preview_url,
            imageUrl: this.state.albumsDetail.images[2].url,
            name: item.name,
            artist: item.artists[0].name
        }
        this.props.onUpdateAudioPlayer(audioPlayer);
        this.setState({
            curentAuidoPlayer: {
                name: audioPlayer.name
            }
        })
    }

    onPlayList = () => {
        const audioPlayer = {
            play: true,
            url: this.state.albums.items[0].preview_url,
            imageUrl: this.state.albumsDetail.images[2].url,
            name: this.state.albums.items[0].name,
            artist: this.state.albums.items[0].artists[0].name
        }
        this.props.onUpdateAudioPlayer(audioPlayer);
        this.setState({
            curentAuidoPlayer: {
                name: audioPlayer.name
            }
        })
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.loadingShow === false ?
                        <div className="PageContainer">
                            <div className="SongsContainer">
                                <Helmet>
                                    <title>{this.state.curentAuidoPlayer.name ? this.state.curentAuidoPlayer.name : "Spotify"}</title>
                                </Helmet>
                                <div className="row">
                                    <div className="col-12 col-md-12 col-xl-4">
                                        {
                                            this.state.albumsDetail.images ?
                                                <Fragment>
                                                    <div className="SongPlaylist">
                                                        <div className="SongImageContainer">
                                                            <img src={this.state.albumsDetail.images[0].url} alt="PlayList" className="SongImage pointer" /><br />
                                                        </div>
                                                        <div className="colorWhite">{this.state.albumsDetail.name}</div>
                                                    </div>
                                                    <div className="center mt30">
                                                        <Button text="Play" onClick={() => this.onPlayList()} />
                                                    </div>
                                                </Fragment>
                                                :
                                                ''
                                        }
                                    </div>
                                    <div className="col-12 col-md-12 col-xl-8">
                                        {
                                            this.state.albums.items ?
                                                this.state.albums.items.map((item, id) =>
                                                    <div key={id} className="row SongList pointer" onClick={() => this.playHandler(item)}>
                                                        <div className="col-1 col-md-1 right">
                                                            <span className="SongIcon"><FontAwesomeIcon className="SongIcon" icon="music" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        </div>
                                                        <div className="col-9 col-md-9">
                                                            <div>
                                                                <span className={(item.name === this.props.audioPlayer.name ? 'CurrentSong' : 'SongName')}>{item.name}</span>
                                                            </div>
                                                            <div>
                                                                {
                                                                    item.artists.map((artist, i) =>
                                                                        <span key={i} className="SongBottomName">{artist.name}, </span>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-2 col-md-2">
                                                            <span>{(item.duration_ms / 60000).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div> : <Loading show={this.state.loadingShow} />
                }
            </Fragment>
        )
    }
}

const mapStateToProps =  state => {
    return({
        audioPlayer: state.audioPlayer
    });
}

const mapDispatchToProps = {
    onUpdateAudioPlayer: updateAudioPlayer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
