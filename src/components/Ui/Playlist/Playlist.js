import React, { Fragment } from 'react';

import './Playlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Playlist = ({
    item,
    onClick
}) => {
    return (
        <Fragment>
            <div className="col-12 col-lg-6 col-xl-3 mt30 center ImageContainer" onClick={onClick}>
                <img src={item.images[0] ? item.images[0].url : '' } alt="Logo" className="PlaylistImage pointer" /><br />
                <div className="Middle pointer">
                    <FontAwesomeIcon className="Playicon" icon="play" />
                </div>
                <span className="fs20 colorWhite">{item.name}</span>
            </div>
        </Fragment>
    )
}

export default Playlist;