import React, { Component } from 'react'
import actions from '../../../redux/actions/actions'
import PostItem from './PostItem'
import styles from '../../sass/activePage/activepage.sass'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ModalDeletePage from './ModalDeletePage'

class ActivePage extends Component {

    constructor (props) {
        super (props)
        this.state = {
            slices: 9,
            whichFilter: "none",
            posts: [],
            isChecked: false,
            searchInput: "",
            bShowSearchResults: false,
            searchResult: [],
            finalSearchResult: [],
            showModalDelete: false
        }
    }

    componentWillMount() {
        this.props.handleLoad()
    }

    componentDidMount() {
        this.props.dispatch(actions.LoadPageData(this.props.pageData.id))
        if (this.props.pageData.posts === undefined) {
            this.props.dispatch(actions.LoadPagePosts(this.props.pageData.id))
        }
        this.getNewPosts(this.props)
        this.checkPostsIfInReport(this.props)
    }

    checkPostsIfInReport(props) {

        for (let i = 0; i < props.state.reportings.length; i++) {

            if (props.state.reportings[i].bActiveReport === true) {

                console.log("Active report found.");

                props.pageData.posts.map(function (post) {

                    if (props.state.reportings[i].posts.map(function (post) {
                        return post.id
                    }).indexOf(post.id) > -1) {

                        if (post.bInReport === false) {
                            console.log("Checking Post.");
                            props.dispatch(actions.CheckPost(post.id, props.pageData.id))
                        }
                    } else {
                        if (post.bInReport === true) {
                            console.log("Unchecking Post.");
                            props.dispatch(actions.UncheckPost(post.id, props.pageData.id))
                        }
                    }
                }, this)

            }
        }


    }

    setFinalSearchResults() {

        this.setState({
            finalSearchResult: this.state.searchResult.slice(0, this.state.slices)
        })
    }

    getInputLength() {
        return this.state.searchInput.length
    }

    searchThroughPosts(props) {

        if (this.state.searchInput !== "") {

            this.setState({
                bShowSearchResults: true
            }, function updateSearchResults() {
                this.setState({
                    searchResult: props.pageData.posts.map(function (post) {
                        if (post.message !== undefined) {
                            let searchIndex = post.message.toLowerCase().indexOf(this.state.searchInput)
                            if (searchIndex !== -1) {
                                console.log("searched!");
                                return Object.assign({}, post, {
                                    message: post.message.slice(0, searchIndex) + '<span class="yellow">' + post.message.slice(searchIndex, searchIndex + this.getInputLength()) + "</span>"+ post.message.slice(searchIndex + this.getInputLength())
                                })
                            }
                        }
                    }, this)
                }, function afterChange() {
                        this.setFinalSearchResults()
                })
            })
        } else {
            this.setState({
                bShowSearchResults: false
            })
        }
    }

    handleChangeSearch(event) {
        console.log("searhcing");
        this.setState({
            searchInput: event.target.value
        }, function afterChange() {
            this.searchThroughPosts(this.props)
        })
    }

    getNewPosts(props) {
        console.log("getting new posts");

        if (this.props.pageData.posts !== undefined) {
            if (this.state.whichFilter === "none") {
                console.log("state was: none");

                this.setState({
                    posts: props.pageData.posts.slice(0, this.state.slices)
                })
            }

            if (this.state.whichFilter === "marked") {
                console.log("state was: marked");
                this.setState({
                    posts:
                        props.pageData.posts.filter(function (post) {
                            return post.bInReport ? true : false
                        })

                })
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log("receiving new props");
        this.getNewPosts(nextProps)

        if (this.props.state.fPageLoaded === true) {
            this.getNewPosts(nextProps)
        }
        this.checkPostsIfInReport(nextProps)
        this.searchThroughPosts(nextProps)
    }

    handleLoadMore() {

        var biggerSlice = this.state.slices + 9

        if (this.state.posts.length >= this.state.slices || this.state.finalSearchResult.length >= this.state.slices) {

            if (this.state.bShowSearchResults !== true) {
                this.setState({
                    slices: biggerSlice
                }, function afterChange() {
                    this.getNewPosts(this.props)

                })
            } else {
                this.setState({
                    slices: biggerSlice
                }, function afterChange() {
                        this.setFinalSearchResults()
                    })
            }
        }
    }

    handleFilterClick() {

        console.log("filter Btn clicked");

        if (this.state.whichFilter === "none") {

            this.setState({
                whichFilter: "marked",
                isChecked: true

            }, function afterChange() {
                this.getNewPosts(this.props)
                console.log("After Change none");

            })
            console.log("State is now marked.");

        } else if (this.state.whichFilter === "marked") {
            this.setState({
                whichFilter: "none",
                isChecked: false
            }, function afterChange() {
                this.getNewPosts(this.props)
                console.log("After Change marked");

            })
            console.log("State is now none.");
        }

    }

    handleClickDelete() {
        this.setState({
            showModalDelete: true
        })
    }

    handleClickClose() {
        this.setState({
            showModalDelete: false
        })
    }


    render() {

        return (
            <div className="page-wrapper">

                <ReactCSSTransitionGroup
                    transitionName="modal"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.state.showModalDelete &&
                        <ModalDeletePage
                            key={1}
                            close={this.handleClickClose.bind(this)}
                            dispatch={this.props.dispatch}
                        />
                    }
                </ReactCSSTransitionGroup>

                <div className="page-info-wrapper">
                    <img src={this.props.pageData.pictureUrl}></img>
                    <h2>{this.props.pageData.name}</h2>

                    <button className="btn" onClick={this.handleClickDelete.bind(this)} >Delete Page</button>

                    <div className="page-filter-wrapper">

                        {this.state.bShowSearchResults !== true ?
                            <div>

                                <label htmlFor="markedPosts">Show posts in current report only</label>

                                <input
                                    type="checkbox"
                                    id="markedPosts"
                                    checked={this.state.isChecked}
                                    onChange={this.handleFilterClick.bind(this)}
                                />
                            </div> :
                            <div>

                                <label for="markedPosts">Show posts in current report only</label>

                                <input
                                    type="checkbox"
                                    id="markedPosts"
                                    checked={false}
                                    onChange=""
                                />
                            </div>
                        }

                        <input
                            type="text"
                            onChange={this.handleChangeSearch.bind(this)}
                            placeholder="Search for a post..."
                            value={this.state.searchInput}
                        />

                    </div>
                </div>



                <div className="page-posts-wrapper">

                    {this.props.pageData.posts !== undefined ?

                        this.state.bShowSearchResults ?

                            this.state.finalSearchResult.map(function (post) {

                                if (post !== null && post !== undefined) {
                                    return <PostItem data={post} userID={this.props.state.user.id} key={post.id} pageID={this.props.pageData.id} bUncheckPosts={this.props.state.bUncheckPosts} reportings={this.props.state.reportings} dispatch={this.props.dispatch}/>
                                }

                            }, this)

                            : this.state.posts.map(function (post) {

                                return <PostItem data={post} key={post.id} userID={this.props.state.user.id} pageID={this.props.pageData.id} bUncheckPosts={this.props.state.bUncheckPosts} reportings={this.props.state.reportings} dispatch={this.props.dispatch}/>

                            }, this)

                    : <div>Loading Posts</div> }



                </div>

                <button onClick={this.handleLoadMore.bind(this)}>Load 9 More</button>


            </div>
        )
    }

}

export default ActivePage
