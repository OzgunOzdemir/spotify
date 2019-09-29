import React from 'react';

import './Button.css';

const buttonComponent = ({
   text,
   onClick
}) => {
    return(
        <button className="Button" onClick={onClick}>{text}</button>
    );
}

export default buttonComponent;