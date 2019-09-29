import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import './Layout.css';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Bottombar from '../../components/Bottombar/Bottombar';

class Layout extends Component {
    
    render () {
        return (
            <Aux>
                <Topbar />
                <Sidebar />
                <div className="Content">
                    {this.props.children}
                </div>
                <Bottombar />
            </Aux>
        )
    }
}

export default Layout;