import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { updateAudioPlayer } from '../../redux/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTracksByPlayList, getPlayList } from '../../services'
import queryString from 'query-string';
import Button from '../../components/Ui/Button/Button';
import Loading from '../../components/Ui/Loading/Loading';
import { Helmet } from "react-helmet";

class Tracks extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tracks: {},
            sectionPlaylist: {},
            curentAuidoPlayer: {
                name: null,
            },
            loadingShow: true
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem("access_token");
        const values = queryString.parse(this.props.location.search);
        const tracks = await getTracksByPlayList(token, values.id);
        const playList = await getPlayList(token, values.id);
        this.setState({
            tracks: tracks.data,
            sectionPlaylist: playList.data,
            loadingShow: false
        })
    }

    playHandler = (item) => {
        const audioPlayer = {
            play: true,
            url: item.track.preview_url,
            imageUrl: item.track.album.images[2].url,
            name: item.track.name,
            artist: item.track.artists[0].name
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
            url: this.state.tracks.items[0].track.preview_url,
            imageUrl: this.state.tracks.items[0].track.album.images[2].url,
            name: this.state.tracks.items[0].track.name,
            artist: this.state.tracks.items[0].track.artists[0].name
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
                                            this.state.sectionPlaylist.images ?
                                                <Fragment>
                                                    <div className="SongPlaylist">
                                                        <div className="SongImageContainer">
                                                            <img src={this.state.sectionPlaylist.images[0].url} alt="PlayList" className="SongImage pointer" /><br />
                                                        </div>
                                                        <div className="colorWhite">{this.state.sectionPlaylist.name}</div>
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
                                            this.state.tracks.items ?
                                                this.state.tracks.items.map((item, id) =>
                                                    <div key={id} className="row SongList pointer" onClick={() => this.playHandler(item)}>
                                                        <div className="col-1 col-md-1 right">
                                                            <span className="SongIcon"><FontAwesomeIcon className="MusicIcon" icon="music" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        </div>
                                                        <div className="col-9 col-md-9">
                                                            <div>
                                                                <span className={(item.track.name === this.props.audioPlayer.name ? 'CurrentSong' : 'SongName')}>{item.track.name}</span>
                                                            </div>
                                                            <div>
                                                                {
                                                                    item.track.artists.map((artist, i) =>
                                                                        <span key={i} className="SongBottomName">{artist.name}, </span>
                                                                    )
                                                                }
                                                                <span className="SongBottomName">&nbsp; * {item.track.album.name}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-2 col-md-2">
                                                            <span>{(item.track.duration_ms / 60000).toFixed(2)}</span>
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

const mapStateToProps = state => {
    return ({
        audioPlayer: state.audioPlayer
    });
}

const mapDispatchToProps = {
    onUpdateAudioPlayer: updateAudioPlayer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
