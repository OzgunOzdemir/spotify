import React, { Fragment } from 'react';

import './Loading.css';

const loading = ({
    show
}) => {
    return (
        <Fragment>
            {
                show === true ?
                    <div className="loadingContainer">
                    </div>
                    : ''
            }
        </Fragment>
    );
}

export default loading;