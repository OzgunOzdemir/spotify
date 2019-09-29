import React, { Component, Fragment } from 'react';

import { getListCategories } from '../../services/index';
import Category from '../../components/Ui/Category/Category';
import Loading from '../../components/Ui/Loading/Loading';

class Categories extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categories: {},
            access_token: null,
            loadingShow: true
        }
    }

    componentDidMount = async () => {
        const token = sessionStorage.getItem("access_token");
        // get categories
        const getCategories = await getListCategories(token);
        this.setState({
            categories: getCategories.data,
            loadingShow: false
        })
    }

    handlerPlaylistspage = (item) => {
        let queryString = "category_id=" + item.id;
        this.props.history.push(`/playlists?${queryString}`);
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.loadingShow === false ?

                        <div className="PageContainer container">
                            <div className="PageTitle">
                                <span className="PageTitleText">Categories</span>
                            </div>
                            <div className="PageContent">
                                <div className="row">
                                    {
                                        this.state.categories.items ?
                                            this.state.categories.items.map((item, i) =>
                                                <Category item={item} key={i} onClick={() => this.handlerPlaylistspage(item)} />
                                            ) : ''
                                    }
                                </div>
                            </div>
                        </div> : <Loading show={this.state.loadingShow} />
                }
            </Fragment>
        )
    }
}

export default Categories;
