import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import '../../../css/corporate_menuselector.css';

class MenuSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: false,
            uid: undefined,
            restaurantId: undefined,
            sidebarCategoryOpen: false,
            menus: [],


            menuActive: undefined,
            menuPublished: undefined,

            menuActiveIndex: -1,
            menuActiveId: undefined,
            menuPublishedIndex: -1, // ammend this so it links to the id of the menu instead of the index position
            menuPublishedId: undefined,


            inputCreateNewMenu: "",
            buttonCreateNewMenuDisabled: false,
            inputEditMenuTitle: "",
            buttonEditMenuTitleDisabled: false
        }
        this.handleInputUpdateMenuTitle.bind(this);
        this.handleInputCreateNewMenu.bind(this);
        this.handleButtonUpdateMenuTitle.bind(this);
        this.handleButtonCreateNewMenu.bind(this);
    }


    componentDidMount() {
        var cookies = document.cookie;
        var cookiesArr = cookies.split(";").map(curr => curr.trim());
        cookiesArr = cookiesArr.map(curr => curr.split("=").map(curr => curr.trim()));
        var token = cookiesArr.find(curr => {
            return curr[0] === "U_TKN";            
        });
        var uid = cookiesArr.find(curr => {
            return curr[0] === "U_ID";            
        });

        if (token) {
            this.setState({
                ...this.state,
                token: token[1],
                uid: uid[1]
            });
            axios.post("/api/allmenus", {uid: uid[1]}, { headers: { Authorization: "Bearer " + token[1] } })
            .then(response => {
                if (response.data.success === false) {
                    this.props.history.push("/login");
                } else {
                    if (response.data.menus.length > 0) {
                        var menuPublishedIndex = response.data.menus.findIndex(curr => {
                            return curr.isPublished === true;
                        });
                        var menuPublishedId = menuPublishedIndex !== -1 ? response.data.menus[menuPublishedIndex]._id : undefined;
                        var menuPublished = menuPublishedIndex !== -1 ? response.data.menus[menuPublishedIndex] : undefined;

                        this.setState({
                            ...this.state,
                            tokenValid: true,
                            restaurantId: response.data.restaurant._id,
                            menus: response.data.menus,
                            menuPublishedId: menuPublishedId,
                            menuPublished: menuPublished
                        });
                    } else {
                        this.setState({
                            ...this.state,
                            restaurantId: response.data.restaurant._id,
                        });
                    }
                }
            });
        } else {
            this.props.history.push("/login");
        }


    }

    handleButtonSidebarToggleClick = () => {
        this.setState({
            ...this.state,
            sidebarCategoryOpen: !this.state.sidebarCategoryOpen
        });
    }
    handleMenuOptionClick = (curr, i) => {
        this.setState({
            ...this.state,
            menuActiveIndex: i,
            menuActiveId: curr._id,
            menuActive: curr,
            inputEditMenuTitle: curr.menuTitle
        });
    }




    handleInputUpdateMenuTitle = (e) => {
        this.setState({
            ...this.state,
            inputEditMenuTitle: e.currentTarget.value
        });
    }
    handleButtonUpdateMenuTitle = (e) => {
        e.preventDefault();
        var tempMenus = [...this.state.menus];
        this.setState({
            ...this.state,
            buttonEditMenuTitleDisabled: true
        });

        var uploadObj = {
            menuId: this.state.menuActive._id,
            menuTitle: this.state.inputEditMenuTitle.trim(),
            uid: this.state.uid
        };
        axios.put("/api/allmenus/rename", uploadObj, { headers: { Authorization: "Bearer " + this.state.token } })
            .then(response => {
                tempMenus.forEach(curr => {
                    if (curr._id === uploadObj.menuId) {
                        curr.menuTitle = uploadObj.menuTitle;
                    }
                });
                this.setState({
                    ...this.state,
                    menus: tempMenus,
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
    handleButtonCreateNewMenu = (e) => {
        e.preventDefault();
        var tempMenus = [...this.state.menus];

        this.setState({
            ...this.state,
            buttonCreateNewMenuDisabled: true
        });

        var uploadObj = { restaurantId: this.state.restaurantId, menuTitle: this.state.inputCreateNewMenu.trim(), uid: this.state.uid };

        axios.post("/api/allmenus/create", uploadObj, { headers: { Authorization: "Bearer " + this.state.token } })
            .then(response => {
                tempMenus.push(response.data.menu);
                this.setState({
                    ...this.state,
                    menus: tempMenus,
                    inputCreateNewMenu: "",
                    buttonCreateNewMenuDisabled: false
                });
            });
    }







    handleButtonDeleteMenu = () => {
        var tempMenus = [...this.state.menus];
        var uploadObj = {
            // restaurantId: this.state.restaurantId,
            menuId: this.state.menuActive._id
        };

        axios.put("/api/allmenus/delete", uploadObj, { headers: { Authorization: "Bearer " + this.state.token } })
            .then(response => {
                tempMenus = tempMenus.filter(curr => {
                    if (curr._id === uploadObj.menuId) {
                        return false;
                    }
                    return true;
                });
                this.setState({
                    ...this.state,
                    menus: tempMenus,
                    menuActive: undefined,
                    menuActiveIndex: -1,
                    inputEditMenuTitle: ""
                });
            });
    }






    handleButtonPublishMenu = () => {
        var tempMenus = [...this.state.menus];
        var uploadObj = {
            restaurantId: this.state.restaurantId,
            menuId: this.state.menuActive._id,
            currentlyPublishedMenuId: this.state.menuPublishedId
        };

        
        axios.put("/api/allmenus/publish", uploadObj, { headers: { Authorization: "Bearer " + this.state.token } })
            .then(response => {
                var newPublishedMenu = response.data.newPublishedMenu;
                var oldPublishedMenu = response.data.oldPublishedMenu;
                tempMenus.forEach(curr => {
                    if (curr._id === newPublishedMenu._id) {
                        curr.isPublished = true;
                    }
                    else if (oldPublishedMenu && curr._id === oldPublishedMenu._id) {
                        curr.isPublished = false;
                    }
                });

                this.setState({
                    ...this.state,
                    menus: tempMenus,
                    menuPublished: newPublishedMenu,
                    menuPublishedId: newPublishedMenu._id,
                });
            });
    }





    handleButtonDuplicateMenu = () => {
        var tempMenus = [...this.state.menus];
        var menuToDuplicate = { ...this.state.menuActive }
        var uploadObj = {
            menuId: menuToDuplicate._id
        };

        axios.post("/api/allmenus/duplicate", uploadObj, { headers: { Authorization: "Bearer " + this.state.token } })
            .then(response => {
                if (response.data.menu) {
                    var duplicatedMenuIndex = tempMenus.findIndex(curr => {
                        return curr._id === menuToDuplicate._id;
                    });
                    if (duplicatedMenuIndex !== -1) {
                        tempMenus.splice(duplicatedMenuIndex + 1, 0, response.data.menu);
                        this.setState({
                            ...this.state,
                            menus: tempMenus
                        });
                    }
                }
            });
    }





    render() {
        var menusArr = [];

        if (this.state.menus.length !== 0) {
            menusArr = this.state.menus.map((curr, i) => {
                var buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09";
                if (this.state.menuActive && this.state.menuPublished) {
                    if (curr._id === this.state.menuActive._id && curr._id === this.state.menuPublished._id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published active";
                    }
                    else if (curr._id === this.state.menuPublished._id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published";
                    } else if (curr._id === this.state.menuActive._id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 active";
                    }
                } else if (this.state.menuPublished) {
                    if (curr._id === this.state.menuPublished._id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 published";
                    }
                } else if (this.state.menuActive) {
                    if (curr._id === this.state.menuActive._id) {
                        buttonClassName = "button--transparent justify-content-start rounded bg-secondary w-100 px-3 py-4 font-14 color-white-09 active";
                    }
                }

                return (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3"
                        key={i}
                    >
                        <p className="font-12 color-black-04 m-0"><i>Created: 10 Nov 2019 at 11:50AM</i></p>
                        <button
                            className={buttonClassName}
                            style={{ wordBreak: "break-all" }}
                            onClick={() => { this.handleMenuOptionClick(curr, i) }}
                        >
                            <p className="m-0 position-relative text-left" style={{ zIndex: 9 }}>{curr.menuTitle.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</p>
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
                if (this.state.menuActive._id === this.state.menuPublished._id) {
                    deleteButtonDisabled = true;
                    editButtonDisabled = true;
                    publishButtonDisabled = true;
                }
            }
        }

        return (
            <div className="menuselector container--outer">

                {/* SIDEBAR */}
                {/* <section className="main-content-sidebar d-flex flex-column"> */}
                <section className={this.state.sidebarCategoryOpen ? "main-content-sidebar d-flex open" : "main-content-sidebar d-flex"}>
                    <div className="sidebarcontents">
                        <div className="px-2 mb-auto">
                            <div className="py-2">
                                <form className="d-flex h-100 w-100">
                                    <input className="w-100 border-0 px-2" placeholder="Rename" value={this.state.inputEditMenuTitle} onChange={this.handleInputUpdateMenuTitle} />

                                    <button
                                        className="button--transparent bg-danger p-2 text-white"
                                        disabled={this.state.inputEditMenuTitle.trim().length === 0 || this.state.buttonEditMenuTitleDisabled || this.state.menuActive === undefined ? true : false}
                                        onClick={this.handleButtonUpdateMenuTitle}
                                    >
                                        <i className="material-icons">edit</i>
                                    </button>
                                </form>
                            </div>

                            <div className="py-2">
                                {
                                    editButtonDisabled ?
                                        (<button disabled className="button--transparent justify-content-center bg-danger p-2 w-100 color-white">
                                            <i className="material-icons">edit</i>&nbsp;EDIT
                                        </button>)
                                        :
                                        (<Link to={"/corporate/menu/builder/" + this.state.menuActive._id}
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

                            <div className="py-2">
                                <button
                                    className="button--transparent justify-content-center bg-danger p-2 w-100 color-white"
                                    disabled={deleteButtonDisabled}
                                    onClick={this.handleButtonDeleteMenu}
                                >
                                    <i className="material-icons">delete</i>&nbsp;DELETE
                                </button>
                            </div>
                            {
                                this.state.menuPublishedId && this.state.menuActiveId && this.state.menuActiveId === this.state.menuPublishedId ?
                                    (<div className="py-2 mt-4">
                                        <p className="color-white font-12">No updates can be performed on a PUBLISHED menu.</p>
                                        <p className="color-white font-12">Duplicate the menu if you wish to make changes</p>
                                    </div>)
                                    :
                                    ""
                            }
                        </div>
                    </div>

                    <div className="sidebarexpand d-sm-none">
                        <button
                            className="button--transparent h-100 w-100"
                            onClick={this.handleButtonSidebarToggleClick}
                        >
                            {this.state.sidebarCategoryOpen ?
                                (<p className="sidewaystext font-14 color-white-06">COLLAPSE<i className="material-icons font-20">keyboard_arrow_up</i></p>)
                                :
                                (<p className="sidewaystext font-14 color-white-06">EXPAND<i className="material-icons font-20">keyboard_arrow_down</i></p>)
                            }
                        </button>
                    </div>
                </section>

                {/* HEADER */}
                <section className="main-content-header pt-3">
                    <div className="container-fluid">
                        <div className="row m-0 mt-3 overflow-hidden shadow-sm bg-white py-3 flex-nowrap px-2 px-lg-0">
                            <div className="col col-md-6 col-lg-3 px-2 px-lg-3">
                                <form className="d-flex">
                                    <input className="w-100 border-dark px-2" placeholder="Create" value={this.state.inputCreateNewMenu} onChange={this.handleInputCreateNewMenu} />
                                    <button className="button--transparent bg-danger p-2 color-white"
                                        disabled={this.state.inputCreateNewMenu.trim().length === 0 || this.state.buttonCreateNewMenuDisabled ? true : false}
                                        onClick={this.handleButtonCreateNewMenu}
                                    >
                                        <i className="material-icons">add</i>
                                    </button>
                                </form>
                            </div>
                            <div className="col-auto col-md-6 col-lg-3 px-2 px-lg-3">
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
                        <div className="container py-5"></div>
                    </section>
                </div>
                {this.state.sidebarCategoryOpen ? (<div className="modal-backdrop show d-sm-none" onClick={this.handleButtonSidebarToggleClick} style={{
                    zIndex: "60"
                }}></div>) : ""}
            </div >
        );
    }
}

export default MenuSelector;