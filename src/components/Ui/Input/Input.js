import React from 'react';
import { Link } from 'react-router-dom';

import './Input.css';

const inputComponent = ({
    type,
    id,
    name,
    onChange,
    placeholder
}) => {
    return(
        <Link to='/'>
        <input type={type} id={id} name={name} onChange={onChange} placeholder={placeholder} />
        </Link>
        
    );
}

export default inputComponent;