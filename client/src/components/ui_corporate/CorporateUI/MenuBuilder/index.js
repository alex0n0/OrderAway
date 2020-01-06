import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import uuidv4 from 'uuid/v4';

import MenuItemCorporate from '../../../elements/menuitem/Corporate';

import '../../../css/corporate_menubuilder.css';


class MenuBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            sidebarCategoryActiveIndex: -1,
            sidebarCategoryActiveId: undefined,
            sidebarCategoryOpen: false,
            menuItemActiveIndex: -1,
            menuItemActiveId: undefined,
            inputRenameCategory: "",
            inputCreateNewCategory: "",

        }
        this.handleInputRenameCategory.bind(this);
        this.handleButtonRenameCategory.bind(this);
        this.handleInputCreateNewCategory.bind(this);
    }

    componentDidMount() {
        var idStartIndex = window.location.pathname.lastIndexOf("/") + 1;
        var id = window.location.pathname.substring(idStartIndex);
        axios.get("/api/menubuilder/" + id)
            .then(response => {
                console.log(response.data);
                console.log("published)", response.data.isPublished);
                this.setState({
                    ...this.state,
                    menu: response.data.menu,
                    sidebarCategoryActiveIndex: response.data.menu.length !== 0 ? 0 : -1,
                    sidebarCategoryActiveId: response.data.menu.length !== 0 ? response.data.menu[0]._id : undefined,
                    inputRenameCategory: response.data.menu.length !== 0 ? response.data.menu[0].categoryTitle : "",
                });
            });
    }

    handleButtonSidebarToggleClick = () => {
        this.setState({
            ...this.state,
            sidebarCategoryOpen: !this.state.sidebarCategoryOpen
        });
    }

    handleSidebarCategoryOptionClick = (categoryId) => {
        var menuCategoryIndex = this.state.menu.findIndex(curr => {
            return curr._id === categoryId;
        });
        var menuCategory = this.state.menu[menuCategoryIndex];
        this.setState({
            ...this.state,
            sidebarCategoryActiveIndex: menuCategoryIndex,
            sidebarCategoryActiveId: categoryId,
            menuItemActiveIndex: -1,
            menuItemActiveId: undefined,
            inputRenameCategory: menuCategory.categoryTitle
        });
    }

    handleMenuItemOptionClick = (menuItemId) => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr._id === this.state.sidebarCategoryActiveId;
        });

        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                return curr._id === menuItemId;
            });
            this.setState({
                ...this.state,
                menuItemId: menuItemId,
                menuItemActiveIndex: menuItemIndex
            });
        }

    }


    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleInputRenameCategory = (e) => {
        this.setState({
            ...this.state,
            inputRenameCategory: e.currentTarget.value
        });
    }

    handleButtonRenameCategory = (e) => {
        e.preventDefault();
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr._id === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            tempMenu[categoryIndex].categoryTitle = this.state.inputRenameCategory.trim();
            this.setState({
                ...this.state,
                menu: tempMenu
            });
        }
    }
    handleInputCreateNewCategory = (e) => {
        this.setState({
            ...this.state,
            inputCreateNewCategory: e.currentTarget.value
        });
    }

    handleButtonCreateNewCategory = (e) => {
        e.preventDefault();
        var tempMenu = [...this.state.menu];
        var newCategoryObj = {
            _id: uuidv4(),
            categoryTitle: this.state.inputCreateNewCategory,
            menuItems: []
        }
        tempMenu.push(newCategoryObj);
        var stateObj = {
            ...this.state,
            menu: tempMenu,
            inputCreateNewCategory: ""
        }
        if (tempMenu.length === 1) {
            stateObj.inputRenameCategory = tempMenu[0].categoryTitle;
            stateObj.sidebarCategoryActiveIndex = 0;
            stateObj.sidebarCategoryActiveId = tempMenu[0]._id;
        }
        this.setState(stateObj);
    }

    handleButtonDeleteCategory = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr._id === this.state.sidebarCategoryActiveId;
        });

        if (categoryIndex !== -1) {
            tempMenu.splice(categoryIndex, 1);

            var stateObj = {
                ...this.state,
                menu: tempMenu,
                sidebarCategoryActiveIndex: tempMenu.length !== 0 ? 0 : -1,
                sidebarCategoryActiveId: tempMenu.length !== 0 ? tempMenu[0]._id : undefined,
                menuItemActiveIndex: -1,
                menuItemActiveId: undefined,
                inputRenameCategory: ""
            }

            if (tempMenu.length > 0) {
                stateObj.inputRenameCategory = tempMenu[0].categoryTitle;
            }

            this.setState(stateObj);
        }
    }

    // ///////////////////////////////////////////////////////////////////////////////////////////////

    handleButtonCreateNewMenuItem = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr._id === this.state.sidebarCategoryActiveId;
        });

        if (categoryIndex !== -1) {
            tempMenu[categoryIndex].menuItems.push({
                _id: uuidv4(),
                isHidden: false,
                imageUrl: "https://media.giphy.com/media/TLIj98vlSKpNXnkrBK/giphy.gif",
                imageOrientationLandscape: true,
                menuItemTitle: "new item",
                description: "description",
                price: 0,
                tags: {
                    vg: false,
                    v: false,
                    gf: false
                }
            });
            this.setState({
                ...this.state,
                menu: tempMenu
            });
        }
    }

    handleButtonDuplicateMenuItem = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr._id === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                return curr._id === this.state.menuItemId;
            });
            if (menuItemIndex !== -1) {
                var menuItem = { ...tempMenu[categoryIndex].menuItems[menuItemIndex] };
                menuItem._id = uuidv4();
                tempMenu[categoryIndex].menuItems.splice(menuItemIndex, 0, menuItem);
                this.setState({
                    ...this.state,
                    menu: tempMenu
                });
            }
        }
    }

    handleButtonEditMenuItem = () => {

    }


    handleButtonDeleteMenuItem = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr._id === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                return curr._id === this.state.menuItemId;
            });
            if (menuItemIndex !== -1) {
                tempMenu[categoryIndex].menuItems.splice(menuItemIndex, 1);

                this.setState({
                    ...this.state,
                    menu: tempMenu,
                    menuItemActiveIndex: -1,
                    menuItemId: undefined
                });
            }
        }
    }



   

    handleButtonSaveMenu = () => {
        console.log(this.state.menu);
        // axios.put("/api/menubuilder/" + this.state.menuDetails.id + "/save", { id: this.state.menuDetails.id, menu: this.state.menuDetails.menu })
        //     .then(response => {
        //         this.setState({
        //             ...this.state,
        //             menuDetails: response.data.menuDetails
        //         });
        //     });
    }

    render() {
        var categoriesArr = [];
        var menuItemsArr = [];
        if (this.state.menu.length !== 0 && this.state.sidebarCategoryActiveId !== undefined) {
            categoriesArr = this.state.menu.map((curr, i) => {
                return (
                    <div key={i} className="d-flex my-3">
                        <button className={curr._id === this.state.sidebarCategoryActiveId ? ("button--transparent w-100 py-2 active") : ("button--transparent bg-secondary w-100 py-2 ")}
                            onClick={() => { this.handleSidebarCategoryOptionClick(curr._id) }}>
                            <p className="m-0 text-truncate w-100"><b>{curr.categoryTitle.toUpperCase()}</b></p>
                        </button>
                    </div>
                )
            });
            if (this.state.menu[this.state.sidebarCategoryActiveIndex].menuItems.length !== 0) {
                menuItemsArr = this.state.menu[this.state.sidebarCategoryActiveIndex].menuItems.map((curr, i) => {
                    return (
                        <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 p-3">
                            <div
                                onClick={() => { this.handleMenuItemOptionClick(curr._id) }}
                                className={i === this.state.menuItemActiveIndex ? "border border-dark h-100 w-100 shadow-sm" : "border border-transparent h-100 w-100"}>
                                <MenuItemCorporate menuItem={curr} />
                            </div>
                        </div>
                    )
                });
            }
        }
        return (
            <div className="menubuilder " >
                <section className={this.state.sidebarCategoryOpen ? "main-content-sidebar d-flex open" : "main-content-sidebar d-flex"}>

                    <div className="sidebarcontents">
                        <div className="d-flex justify-content-between" style={{ position: "relative" }}>
                            <Link to="/corporate/menu" style={{ textDecoration: "none" }}>
                                <div className="button--transparent flex-column p-3 color-white" >
                                    <i className="material-icons">keyboard_arrow_left</i>
                                </div>
                            </Link>
                        </div>
                        <div className="px-2 my-3">
                            <button className="button--transparent bg-danger w-100 flex-column py-2"
                                onClick={this.handleButtonSaveMenu}>
                                <p className="m-0"><b>SAVE</b></p>
                            </button>
                        </div>
                        <div className="px-2 mb-auto">
                            {
                                categoriesArr
                            }
                            <div className="mt-5 d-flex">
                                <form className="d-flex">
                                    <input className="w-100 border-0 px-2" placeholder="Rename" value={this.state.inputRenameCategory} onChange={this.handleInputRenameCategory} />
                                    <button className="button--transparent bg-danger p-2"
                                        disabled={this.state.inputRenameCategory.trim().length === 0 || this.state.sidebarCategoryActiveId === -1 ? true : false}
                                        onClick={this.handleButtonRenameCategory}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                </form>
                            </div>
                            <div className="d-flex mt-5">
                                <form className="d-flex">
                                    <input className="w-100 border-0 px-2" placeholder="New Category" value={this.state.inputCreateNewCategory} onChange={this.handleInputCreateNewCategory} />
                                    <button className="button--transparent bg-danger p-2"
                                        disabled={this.state.inputCreateNewCategory.trim().length === 0 ? true : false}
                                        onClick={this.handleButtonCreateNewCategory}>
                                        <i className="material-icons">add</i>
                                    </button>
                                </form>
                            </div>
                            <div className="mt-3">
                                <button className="button--transparent bg-danger p-2 h-100 w-100"
                                    disabled={this.state.sidebarCategoryActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonDeleteCategory}>
                                    DELETE
                            </button>
                            </div>
                        </div>
                    </div>

                    <div className="sidebarexpand d-sm-none">
                        <button
                            className="button--transparent h-100 w-100"
                            onClick={this.handleButtonSidebarToggleClick}>
                            {this.state.sidebarCategoryOpen ?
                                (<p className="sidewaystext font-14 color-white-06">COLLAPSE<i className="material-icons font-20">keyboard_arrow_up</i></p>)
                                :
                                (<p className="sidewaystext font-14 color-white-06">EXPAND<i className="material-icons font-20">keyboard_arrow_down</i></p>)
                            }
                        </button>
                    </div>
                </section>

                <section className="main-content-header pt-3">
                    <div className="container-fluid">
                        <div className="row m-0 mt-3 px-2 px-lg-0 overflow-hidden shadow-sm bg-white py-3">
                            <div className="col-3 px-2 px-lg-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.sidebarCategoryActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonCreateNewMenuItem}>
                                    <i className="material-icons">add</i><span className="d-none d-lg-inline-block">&nbsp;Create Item</span>
                                </button>
                            </div>
                            <div className="col-3 px-2 px-lg-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.menuItemActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonDuplicateMenuItem}>
                                    <i className="material-icons">file_copy</i><span className="d-none d-lg-inline-block">&nbsp;Duplicate</span>
                                </button>
                            </div>
                            <div className="col-3 px-2 px-lg-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.menuItemActiveIndex === -1 ? true : false}>
                                    <i className="material-icons">edit</i><span className="d-none d-lg-inline-block">&nbsp;Edit</span>
                                </button>
                            </div>
                            <div className="col-3 px-2 px-lg-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.menuItemActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonDeleteMenuItem}>
                                    <i className="material-icons">delete</i><span className="d-none d-lg-inline-block">&nbsp;Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>




                <div className="container--outer">
                    <section className="main-content-content container-fluid pb-5">
                        <div className="row m-0">
                            {/* MENU ITEM START */}
                            {/* MENU ITEM */}
                            {
                                menuItemsArr
                            }
                            {/* MENU ITEM END */}
                        </div>
                        <div className="container py-5"></div>
                    </section>
                </div>
                {this.state.sidebarCategoryOpen ?
                    (<div
                        className="modal-backdrop show d-sm-none"
                        onClick={this.handleButtonSidebarToggleClick}
                        style={{ zIndex: "9960" }}></div>
                    )
                    :
                    ""
                }
            </div>
        );
    }
}

export default MenuBuilder;