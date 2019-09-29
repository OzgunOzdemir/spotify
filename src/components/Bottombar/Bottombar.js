import React, { Component } from 'react';

import '../Bottombar/Bottombar.css';
import { connect } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

class bottombar extends Component {

    render() {
        return (
            <div className="Bottombar">
                <div className="row">
                    <div className="d-none d-lg-block col-lg-5">
                        {
                            this.props.audioPlayer ?
                                this.props.audioPlayer.play === true ?
                                    <div className="CurrentImageContainer">
                                        <div className="row">
                                            <div className="col-2">
                                                <img src={this.props.audioPlayer.imageUrl} alt="CurrentPlayList" className="CurrentTrackImage pointer" /><br />
                                            </div>
                                            <div className="col-10">
                                                <div className="CurrentPlayName">
                                                    <span>{this.props.audioPlayer.name}</span>
                                                </div>
                                                <div className="CurrentPlayArtist">
                                                    <span>{this.props.audioPlayer.artist}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : '' : ''
                        }
                    </div>
                    <div className="col-12 col-lg-7 ReactAudioPlayer">
                        {
                            this.props.audioPlayer ?
                                this.props.audioPlayer.play === true ?
                                    <ReactAudioPlayer
                                        src={this.props.audioPlayer.url}
                                        autoPlay
                                        controls
                                    /> : '' : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        audioPlayer: state.audioPlayer
    });
}


export default connect(mapStateToProps, null)(bottombar);