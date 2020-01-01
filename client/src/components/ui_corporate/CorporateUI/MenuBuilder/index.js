import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import MenuItemCorporate from '../../../elements/menuitem/Corporate';

import '../../../css/corporate_menubuilder.css';


class MenuBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDetails: {},
            sidebarCategoryActiveIndex: -1,
            sidebarCategoryActiveId: -1,
            menuItemActiveIndex: -1,
            menuItemActiveId: -1,
            inputRenameCategory: "",
            inputCreateNewCategory: "",
        }
        this.handleInputCreateNewCategory.bind(this);
    }

    componentDidMount() {
        var idStartIndex = window.location.pathname.lastIndexOf("/") + 1;
        var id = window.location.pathname.substring(idStartIndex);
        axios.get("/api/menubuilder/" + id)
            .then(response => {
                this.setState({
                    ...this.state,
                    menuDetails: response.data.menuDetails,
                    sidebarCategoryActiveIndex: response.data.menuDetails.menu.length !== 0 ? 0 : -1,
                    sidebarCategoryActiveId: response.data.menuDetails.menu.length !== 0 ? response.data.menuDetails.menu[0].id : -1,
                    inputRenameCategory: response.data.menuDetails.menu.length !== 0 ? response.data.menuDetails.menu[0].category : "",
                });
            });
    }

    handleSidebarCategoryOptionClick = (categoryId) => {
        var menuCategoryIndex = this.state.menuDetails.menu.findIndex(curr => {
            return curr.id === categoryId;
        });
        var menuCategory = this.state.menuDetails.menu[menuCategoryIndex];
        this.setState({
            ...this.state,
            sidebarCategoryActiveId: categoryId,
            sidebarCategoryActiveIndex: menuCategoryIndex,
            menuItemActiveId: -1,
            menuItemActiveIndex: -1,
            inputRenameCategory: menuCategory.category
        });
    }

    handleMenuItemOptionClick = (menuItemId) => {
        var menuItemIndex = this.state.menuDetails.menu[this.state.sidebarCategoryActiveIndex].menuItems.findIndex(curr => {
            return curr.id === menuItemId;
        });
        this.setState({
            ...this.state,
            menuItemId: menuItemId,
            menuItemActiveIndex: menuItemIndex
        });
    }


    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    handleInputRenameCategory = (e) => {
        this.setState({
            ...this.state,
            inputRenameCategory: e.currentTarget.value
        });
    }

    handleButtonRenameCategory = () => {
        var tempMenuDetails = { ...this.state.menuDetails };
        var categoryIndex = this.state.menuDetails.menu.findIndex(curr => {
            return curr.id === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            tempMenuDetails.menu[categoryIndex].category = this.state.inputRenameCategory.trim();
            this.setState({
                ...this.state,
                menuDetails: tempMenuDetails
            });
        }

        // updates not necessary, processed offline
        // axios.put("/api/menubuilder/" + this.state.menuDetails.id + "/renamecategory", { id: this.state.sidebarCategoryActiveId, category: this.state.inputRenameCategory.trim() })
        //     .then(response => {
        //         this.setState({
        //             ...this.state,
        //             menuDetails: response.data.menu
        //         });
        //     });
    }
    handleInputCreateNewCategory = (e) => {
        this.setState({
            ...this.state,
            inputCreateNewCategory: e.currentTarget.value
        });
    }

    handleButtonCreateNewCategory = () => {
        var tempMenuDetails = { ...this.state.menuDetails };
        tempMenuDetails.menu.push({
            id: tempMenuDetails.menu.length + 1,
            category: this.state.inputCreateNewCategory,
            menuItems: []
        });
        var stateObj = {
            ...this.state,
            menuDetails: tempMenuDetails,
            inputCreateNewCategory: ""
        }
        if (tempMenuDetails.menu.length === 1) {
            stateObj.inputRenameCategory = tempMenuDetails.menu[0].category;
            stateObj.sidebarCategoryActiveIndex = 0;
            stateObj.sidebarCategoryActiveId = tempMenuDetails.menu[0].id;
        }
        this.setState(stateObj);

        // updates not necessary, processed offline
        // axios.post("/api/menubuilder/" + this.state.menuDetails.id + "/createcategory", { category: this.state.inputCreateNewCategory.trim() })
        //     .then(response => {
        //         this.setState({
        //             ...this.state,
        //             menuDetails: response.data.menu,
        //             inputCreateNewCategory: ""
        //         });
        //     });
    }

    handleButtonDeleteCategory = () => {
        var tempMenuDetails = { ...this.state.menuDetails };
        var categoryIndex = this.state.menuDetails.menu.findIndex(curr => {
            return curr.id === this.state.sidebarCategoryActiveId;
        });

        if (categoryIndex !== -1) {
            tempMenuDetails.menu.splice(categoryIndex, 1);

            var stateObj = {
                ...this.state,
                menuDetails: tempMenuDetails,
                sidebarCategoryActiveIndex: this.state.menuDetails.menu.length !== 0 ? 0 : -1,
                sidebarCategoryActiveId: this.state.menuDetails.menu.length !== 0 ? this.state.menuDetails.menu[0].id : -1,
                menuItemActiveIndex: -1,
                menuItemActiveId: -1,
            }

            if (tempMenuDetails.menu.length === 0) {
                console.log("empty");
                stateObj.inputRenameCategory = "";
            } else {
                stateObj.inputRenameCategory = this.state.menuDetails.menu[0].category;
            }
            
            this.setState(stateObj);
        }
    }

    // ///////////////////////////////////////////////////////////////////////////////////////////////

    handleButtonCreateNewMenuItem = () => {
        var tempMenuDetails = {...this.state.menuDetails};
        var categoryIndex = this.state.menuDetails.menu.findIndex(curr => {
            return curr.id === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            tempMenuDetails.menu[categoryIndex].menuItems.push({
                id: this.randomId(10),
                imageUrl: "https://media.giphy.com/media/TLIj98vlSKpNXnkrBK/giphy.gif",
                imageOrientationLandscape: true,
                title: "new item",
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
                menuDetails: tempMenuDetails
            });
        }
    }

    handleButtonDeleteMenuItem = () => {
        var tempMenuDetails = { ...this.state.menuDetails };
        var categoryIndex = this.state.menuDetails.menu.findIndex(curr => {
            return curr.id === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenuDetails.menu[categoryIndex].menuItems.findIndex(curr => {
                return curr.id === this.state.menuItemId;
            });
            if (menuItemIndex !== -1) {
                tempMenuDetails.menu[categoryIndex].menuItems.splice(menuItemIndex, 1);

                this.setState({
                    ...this.state,
                    menu: tempMenuDetails,
                    menuItemActiveIndex: -1,
                    menuItemId: -1
                });
            }
        }
    }



    handleButtonDuplicateMenuItem = () => {
        var tempMenuDetails = { ...this.state.menuDetails };
        var categoryIndex = this.state.menuDetails.menu.findIndex(curr => {
            return curr.id === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenuDetails.menu[categoryIndex].menuItems.findIndex(curr => {
                return curr.id === this.state.menuItemId;
            });
            if (menuItemIndex !== -1) {
                var menuItem = { ...tempMenuDetails.menu[categoryIndex].menuItems[menuItemIndex] };
                menuItem.id = this.randomId(10);
                tempMenuDetails.menu[categoryIndex].menuItems.splice(menuItemIndex, 0, menuItem);
                this.setState({
                    ...this.state,
                    menuDetails: tempMenuDetails
                });
            }
        }
    }

    handleButtonSaveMenu = () => {
        axios.put("/api/menubuilder/" + this.state.menuDetails.id + "/save", {id: this.state.menuDetails.id, menu: this.state.menuDetails.menu})
        .then(response => {
            this.setState({
                ...this.state,
                menuDetails: response.data.menuDetails
            });
        });
    }

    randomId = (length) => {
        var id = "";
        for (let i = 0; i < length; i++) {
            id += String(Math.floor(Math.random() * 10));
        }
        return id;
    }

    render() {
        var categoriesArr = [];
        var menuItemsArr = [];
        if (this.state.menuDetails.menu) {
            if (this.state.menuDetails.menu.length !== 0 && this.state.sidebarCategoryActiveId !== -1) {
                categoriesArr = this.state.menuDetails.menu.map((curr, i) => {
                    return (
                        <div className="d-flex my-3"
                            key={i}
                        >
                            <button className={curr.id === this.state.sidebarCategoryActiveId ? ("button--transparent bg-secondary w-100 py-2 active") : ("button--transparent bg-secondary w-100 flex-column py-2")}
                                onClick={() => { this.handleSidebarCategoryOptionClick(curr.id) }}
                            >
                                <p className="m-0"><b>{curr.category.toUpperCase()}</b></p>
                            </button>
                        </div>
                    )
                });
                if (this.state.menuDetails.menu[this.state.sidebarCategoryActiveIndex].menuItems.length !== 0) {
                    menuItemsArr = this.state.menuDetails.menu[this.state.sidebarCategoryActiveIndex].menuItems.map((curr, i) => {
                        return (
                            <div
                                key={i}
                                className="col-12 col-sm-6 col-md-4 col-lg-3 p-3"
                            >
                                <div
                                    onClick={() => { this.handleMenuItemOptionClick(curr.id) }}
                                    className={i === this.state.menuItemActiveIndex ? "border border-success h-100 w-100" : "border border-white h-100 w-100"}
                                >
                                    <MenuItemCorporate menuItem={curr} />
                                </div>
                            </div>
                        )
                    });
                }
            }
        }
        return (
            <div className="menubuilder " >
                <section className="main-content-sidebar d-flex flex-column">
                    <div className="d-flex">
                        <Link to="/corporate/menu" style={{ textDecoration: "none" }}>
                            <div className="button--transparent flex-column p-3 color-white" >
                                <i className="material-icons">keyboard_arrow_left</i>
                            </div>
                        </Link>
                    </div>
                    <div className="px-2 my-3">
                        <button className="button--transparent bg-danger w-100 flex-column py-2"
                            onClick={this.handleButtonSaveMenu}
                        >
                            <p className="m-0"><b>SAVE</b></p>
                        </button>
                    </div>
                    <div className="px-2 mb-auto">
                        {
                            categoriesArr
                        }
                        <div className="d-flex mt-5">
                            <input className="w-100 border-0 px-2" placeholder="Rename" value={this.state.inputRenameCategory} onChange={this.handleInputRenameCategory} />
                            <button className="button--transparent bg-success p-2"
                                disabled={this.state.inputRenameCategory.trim().length === 0 || this.state.sidebarCategoryActiveId === -1 ? true : false}
                                onClick={this.handleButtonRenameCategory}
                            >
                                <i className="material-icons">edit</i>
                            </button>
                        </div>
                        <div className="d-flex mt-5">
                            <input className="w-100 border-0 px-2" placeholder="New Category" value={this.state.inputCreateNewCategory} onChange={this.handleInputCreateNewCategory} />
                            <button className="button--transparent bg-success p-2"
                                disabled={this.state.inputCreateNewCategory.trim().length === 0 ? true : false}
                                onClick={this.handleButtonCreateNewCategory}
                            >
                                <i className="material-icons">add</i>
                            </button>
                        </div>
                        <div className="mt-3">
                            <button className="button--transparent bg-danger p-2 h-100 w-100"
                                onClick={this.handleButtonDeleteCategory}
                            >
                                DELETE
                            </button>
                        </div>
                    </div>
                </section>

                <section className="main-content-header pt-3">
                    <div className="container-fluid">
                        <div className="row m-0 mt-3 overflow-hidden shadow-sm bg-white py-3">
                            <div className="col-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.sidebarCategoryActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonCreateNewMenuItem}
                                >
                                    <i className="material-icons">add</i><span className="d-none d-lg-inline-block">&nbsp;Create Item</span>
                                </button>
                            </div>
                            <div className="col-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.menuItemActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonDuplicateMenuItem}
                                >
                                    <i className="material-icons">file_copy</i><span className="d-none d-lg-inline-block">&nbsp;Duplicate</span>
                                </button>
                            </div>
                            <div className="col-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.menuItemActiveIndex === -1 ? true : false}
                                >
                                    <i className="material-icons">edit</i><span className="d-none d-lg-inline-block">&nbsp;Edit</span>
                                </button>
                            </div>
                            <div className="col-3">
                                <button className="button--transparent bg-danger h-100 w-100 py-2 color-white"
                                    disabled={this.state.menuItemActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonDeleteMenuItem}
                                >
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
                    </section>
                </div>
            </div>
        );
    }
}

export default MenuBuilder;