import React, { Component } from 'react';

import './Sidebar.css';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/index';
import { NavLink, Link } from 'react-router-dom';
import { getMe } from '../../services/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/Img/logo.png';

class sidebar extends Component {
    
    componentDidMount = async () => {
        const token = sessionStorage.getItem("access_token");
        // for refresh page
        if (token) {
            // get profile
            const me = await getMe(token);
            this.props.onUpdateUser(me.data);
        }
    }


    render() {
        return (
            <div className="Sidebar">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
                <nav>
                    <div className="NavItem">
                        <FontAwesomeIcon className="Navicon" icon="home" />&nbsp;&nbsp;&nbsp;
                            <span className="Navtext">
                            <NavLink
                                to="/"
                                style={{ textDecoration: 'none', color: '#b3b3b3' }}
                                activeStyle={{ color: '#fff', fontWeight: "bold", textDecoration: 'none' }}
                                exact>
                                Home
                            </NavLink>
                        </span>
                    </div>
                    <div className="NavItem">
                        <FontAwesomeIcon className="Navicon" icon="table" />&nbsp;&nbsp;&nbsp;
                            <span className="Navtext">
                            <NavLink
                                to="/categories"
                                style={{ textDecoration: 'none', color: '#b3b3b3' }}
                                activeStyle={{ color: '#fff', fontWeight: "bold", textDecoration: 'none' }}
                                exact>
                                Categories
                            </NavLink>
                        </span>
                    </div>
                    <div className="NavItem">
                        <FontAwesomeIcon className="Navicon" icon="compact-disc" />&nbsp;&nbsp;&nbsp;
                            <span className="Navtext">
                            <NavLink
                                to="/new-releases"
                                style={{ textDecoration: 'none', color: '#b3b3b3' }}
                                activeStyle={{ color: '#fff', fontWeight: "bold", textDecoration: 'none' }}
                                exact>
                                New Releases
                            </NavLink>
                        </span>
                    </div>
                </nav>
                <div className="UserItem">
                    <FontAwesomeIcon className="Navicon" icon="user" />&nbsp;&nbsp;&nbsp;
                     <span className="UserItemText">
                        {this.props.currentUser[0] ? this.props.currentUser[0].display_name : ''}
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
        currentUser: state.user
    });
}

const mapDispatchToProps = {
    onUpdateUser: updateUser
}


export default connect(mapStateToProps, mapDispatchToProps)(sidebar);