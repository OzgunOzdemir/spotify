import React, { Fragment } from 'react';

import './Category.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Category = ({
    item,
    onClick
}) => {
    return (
        <Fragment>
            <div className="col-12 col-lg-6 col-xl-3 mt30 center ImageContainer" onClick={onClick}>
                <img src={item.icons[0].url} alt="Logo" className="CategoryImage pointer" /><br />
                <div className="Middle pointer">
                    <FontAwesomeIcon className="Playicon" icon="play" />
                </div>
                <span className="fs20 colorWhite">{item.name}</span>
            </div>
        </Fragment>
    )
}

export default Category;