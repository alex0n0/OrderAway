import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import '../../../css/corporate_menuselector.css';

class MenuSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],


            menuActive: undefined,
            menuPublished: undefined,


            menuActiveIndex: -1,
            menuPublishedIndex: -1, // ammend this so it links to the id of the menu instead of the index position
            menuPublishedId: -1,



            inputCreateNewMenu: "",
            buttonCreateNewMenuDisabled: false,
            inputEditMenuTitle: "",
            buttonEditMenuTitleDisabled: false
        }
        this.handleInputUpdateMenuTitle.bind(this);
        this.handleInputCreateNewMenu.bind(this);
    }

    componentDidMount() {
        axios.get("/api/allmenus")
            .then(response => {
                var menuPublishedId = -1;
                menuPublishedId = response.data.allmenus.findIndex(curr => {
                    return curr.published === true;
                });
                var menuPublished = menuPublishedId !== -1 ? response.data.allmenus[menuPublishedId] : undefined;

                // published active at start
                // this.setState({
                //     ...this.state,
                //     menus: response.data.allmenus,
                //     menuActive: menuPublished,
                //     menuPublished: menuPublished,
                //     menuPublishedId: menuPublishedId,
                //     inputEditMenuTitle: menuPublishedId !== -1 ? response.data.allmenus[menuPublishedId].title: ""
                // });
                // nothing active at start
                this.setState({
                    ...this.state,
                    menus: response.data.allmenus,
                    menuPublished: menuPublished,
                    menuPublishedId: menuPublishedId
                });
            });
    }

    handleMenuOptionClick = (curr, i) => { // (i) can prune later
        this.setState({
            ...this.state,
            menuActive: curr,
            menuActiveIndex: i, // can prune later
            inputEditMenuTitle: curr.title
        });
    }

    handleInputUpdateMenuTitle = (e) => {
        this.setState({
            ...this.state,
            inputEditMenuTitle: e.currentTarget.value
        });
    }
    handleButtonUpdateMenuTitle = (e) => {
        this.setState({
            ...this.state,
            buttonEditMenuTitleDisabled: true
        });
        axios.put("/api/allmenus/rename", { id: this.state.menuActive.id, title: this.state.inputEditMenuTitle.trim() })
            .then(response => {
                this.setState({
                    ...this.state,
                    menus: response.data.allmenus,
                    buttonEditMenuTitleDisabled: false
                });
            })
    }

    handleInputCreateNewMenu = (e) => {
        this.setState({
            ...this.state,
            inputCreateNewMenu: e.currentTarget.value
        });
    }

    handleButtonCreateNewMenu = () => {
        this.setState({
            ...this.state,
            buttonCreateNewMenuDisabled: true
        });

        axios.post("/api/allmenus/create", { title: this.state.inputCreateNewMenu.trim() })
            .then(response => {
                this.setState({
                    ...this.state,
                    menus: response.data.allmenus,
                    inputCreateNewMenu: "",
                    buttonCreateNewMenuDisabled: false
                });
            });
    }


    handleButtonDeleteMenu = () => {
        axios.put("/api/allmenus/delete", { id: this.state.menuActive.id })
            .then(response => {
                this.setState({
                    ...this.state,
                    menus: response.data.allmenus,
                    menuActive: undefined,
                    menuActiveIndex: -1,
                    inputEditMenuTitle: ""
                });
            });
    }
    handleButtonPublishMenu = () => {
        axios.put("/api/allmenus/publish", { id: this.state.menuActive.id })
            .then(response => {
                var menuPublishedId = -1;
                menuPublishedId = response.data.allmenus.findIndex(curr => {
                    return curr.published === true;
                });
                var menuPublished = menuPublishedId !== -1 ? response.data.allmenus[menuPublishedId] : undefined;

                this.setState({
                    ...this.state,
                    menus: response.data.allmenus,
                    menuPublished: menuPublished,
                    menuPublishedId: menuPublishedId,
                });
            });
    }

    handleButtonDuplicateMenu = () => {
        axios.post("/api/allmenus/duplicate", {
            id: this.state.menuActive.id,
            title: this.state.menuActive.title
        })
            .then(response => {
                this.setState({
                    ...this.state,
                    menus: response.data.allmenus
                });
            });
    }




    render() {
        var menusArr = [];

        if (this.state.menus.length !== 0) {
            menusArr = this.state.menus.map((curr, i) => {
                var buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09";
                if (this.state.menuActive && this.state.menuPublished) {
                    if (curr.id === this.state.menuActive.id && curr.id === this.state.menuPublished.id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published active";
                    }
                    else if (curr.id === this.state.menuPublished.id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published";
                    } else if (curr.id === this.state.menuActive.id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 active";
                    }
                } else if (this.state.menuPublished) {
                    if (curr.id === this.state.menuPublished.id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published";
                    }
                } else if (this.state.menuActive) {
                    if (curr.id === this.state.menuActive.id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 active";   
                    }
                }
                // if (this.state.menuActive && this.state.menuPublished) {
                //     if (curr.id === this.state.menuActive.id && curr.id === this.state.menuPublished.id) {
                //         buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published active"
                //     }
                //     else if (curr.id === this.state.menuPublished.id) {
                //         buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published"
                //     }
                //     else if (curr.id === this.state.menuActive.id) {
                //         buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 active"
                //     }
                // }
                // else if (this.state.published) {
                //     if (curr.id === this.state.menuPublished.id) {
                //         buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published"
                //     }
                // }
                // else if (this.state.menuActive) {
                //     if (curr.id === this.state.menuActive.id) {
                //         buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 active"
                //     }
                // }
                return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3"
                        key={i}
                    >
                        <button
                            className={buttonClassName}
                            style={{ wordBreak: "break-all" }}
                            onClick={() => { this.handleMenuOptionClick(curr, i) }}
                        >
                            <p className="m-0 position-relative text-left" style={{ zIndex: 9 }}>{curr.title.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</p>
                            <div className="background"></div>
                        </button>
                    </div>
                );
            });
        }

        var deleteButtonDisabled = true;
        var editButtonDisabled = true;
        var publishButtonDisabled = true;
        if (this.state.menuActive !== undefined) {
            deleteButtonDisabled = false;
            editButtonDisabled = false;
            publishButtonDisabled = false;
            if (this.state.menuPublished !== undefined) {
                if (this.state.menuActive.id === this.state.menuPublished.id) {
                    deleteButtonDisabled = true;
                    editButtonDisabled = true;
                    publishButtonDisabled = true;
                }
            }
        }

        return (
            <div className="menuselector container--outer">

                {/* SIDEBAR */}
                <section className="main-content-sidebar d-flex flex-column">
                    <div className="px-2 mb-auto">
                        <div className="d-flex py-2">
                            <input className="w-100 border-0 px-2" placeholder="Rename" value={this.state.inputEditMenuTitle} onChange={this.handleInputUpdateMenuTitle} />

                            <button
                                className="button--transparent bg-danger p-2 text-white"
                                disabled={this.state.inputEditMenuTitle.trim().length === 0 || this.state.buttonEditMenuTitleDisabled || this.state.menuActive === undefined ? true : false}
                                onClick={this.handleButtonUpdateMenuTitle}
                            >
                                <i className="material-icons">edit</i>
                            </button>
                        </div>
                        <div className="py-2">
                            <button
                                className="button--transparent justify-content-center bg-danger p-2 w-100 color-white"
                                // disabled={this.state.menuActiveIndex === this.state.menuPublishedIndex || this.state.menuActiveIndex === -1 ? true : false}
                                disabled={deleteButtonDisabled}
                                onClick={this.handleButtonDeleteMenu}
                            >
                                <i className="material-icons">delete</i>&nbsp;DELETE
                            </button>
                        </div>
                        <div className="py-2">
                            {
                                editButtonDisabled ?
                                    (<button disabled className="button--transparent justify-content-center bg-danger p-2 w-100 color-white">
                                        <i className="material-icons">edit</i>&nbsp;EDIT
                                    </button>)
                                    :
                                    (<Link to={"/corporate/menu/builder/" + this.state.menuActive.id}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button className="button--transparent justify-content-center bg-danger p-2 w-100 h-100 color-white">
                                            <i className="material-icons">edit</i>&nbsp;EDIT
                                </button>
                                    </Link>)
                            }
                        </div>
                        <div className="py-2">
                            <button
                                className="button--transparent justify-content-center bg-danger p-2 w-100 color-white"
                                disabled={publishButtonDisabled}
                                onClick={this.handleButtonPublishMenu}
                            >
                                <i className="material-icons">save</i>&nbsp;PUBLISH
                            </button>
                        </div>
                    </div>
                </section>

                {/* HEADER */}
                <section className="main-content-header pt-3">
                    <div className="container-fluid">
                        <div className="row m-0 mt-3 overflow-hidden shadow-sm bg-white py-3 flex-nowrap">
                            <div className="col col-md-6 col-lg-3">
                                <div className="d-flex">
                                    <input className="w-100 border-dark px-2" placeholder="Create" value={this.state.inputCreateNewMenu} onChange={this.handleInputCreateNewMenu} />
                                    <button className="button--transparent bg-danger p-2 color-white"
                                        disabled={this.state.inputCreateNewMenu.trim().length === 0 || this.state.buttonCreateNewMenuDisabled ? true : false}
                                        onClick={this.handleButtonCreateNewMenu}
                                    >
                                        <i className="material-icons">add</i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-auto col-md-6 col-lg-3 pl-0 pl-sm-3">
                                <button
                                    className="button--transparent justify-content-center bg-danger p-2 w-100 color-white"
                                    disabled={this.state.menuActive === undefined ? true : false}
                                    onClick={this.handleButtonDuplicateMenu}
                                >
                                    <i className="material-icons">file_copy</i><span className="d-none d-md-inline-block">&nbsp;DUPLICATE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>



                <div className="container--outer">
                    <section className="main-content-content container-fluid pb-5">
                        <div className="row mx-0">
                            {/* MENUS START */}
                            {
                                menusArr
                            }
                            {/* MENUS START */}
                        </div>
                    </section>
                </div>
            </div >
        );
    }
}

export default MenuSelector;