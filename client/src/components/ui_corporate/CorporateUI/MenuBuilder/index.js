import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

import MenuItemCorporate from '../../../elements/menuitem/Corporate';
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
// import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import '../../../css/corporate_menubuilder.css';


class MenuBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            uid: undefined,
            menu: [],
            sidebarCategoryActiveIndex: -1,
            sidebarCategoryActiveId: undefined,
            sidebarCategoryOpen: false,
            menuItemActiveIndex: -1,
            menuItemActiveId: undefined,
            inputRenameCategory: "",
            inputCreateNewCategory: "",
            modalCreateEditIsShown: false,
            modalCreateEditModeIsCreate: true,
            modalCreateEditMenuItem: undefined,
        }
        this.handleInputRenameCategory.bind(this);
        this.handleButtonRenameCategory.bind(this);
        this.handleInputCreateNewCategory.bind(this);
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

            var idStartIndex = window.location.pathname.lastIndexOf("/") + 1;
            var id = window.location.pathname.substring(idStartIndex);
            axios.get("/api/menubuilder/" + id, { headers: { Authorization: "Bearer " + token[1] } })
                .then(response => {
                    console.log(response.data);
                    if (response.data.restaurant) {
                        this.props.liftRestuarantTitle(response.data.restaurant.restaurantTitle);
                    }

                    if (response.data.menu) {
                        this.setState({
                            ...this.state,
                            menuId: response.data.menu._id,
                            menu: response.data.menu.categories,
                            sidebarCategoryActiveIndex: response.data.menu.categories.length !== 0 ? 0 : -1,
                            sidebarCategoryActiveId: response.data.menu.categories.length !== 0 ? response.data.menu.categories[0].categoryId : undefined,
                            inputRenameCategory: response.data.menu.categories.length !== 0 ? response.data.menu.categories[0].categoryTitle : "",
                        });
                    } else {
                        console.log("error has occured, menu undefined");
                    }
                });
        } else {
            this.props.history.push("/signin");
        }

    }

    handleButtonSidebarToggleClick = () => {
        this.setState({
            ...this.state,
            sidebarCategoryOpen: !this.state.sidebarCategoryOpen
        });
    }

    handleSidebarCategoryOptionClick = (categoryId) => {
        var menuCategoryIndex = this.state.menu.findIndex(curr => {
            return curr.categoryId === categoryId;
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
            return curr.categoryId === this.state.sidebarCategoryActiveId;
        });

        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                return curr.menuItemId === menuItemId;
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
            return curr.categoryId === this.state.sidebarCategoryActiveId;
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
            categoryId: uuidv4(),
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
            stateObj.sidebarCategoryActiveId = tempMenu[0].categoryId;
        }
        this.setState(stateObj);
    }

    handleButtonDeleteCategory = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr.categoryId === this.state.sidebarCategoryActiveId;
        });

        if (categoryIndex !== -1) {
            tempMenu.splice(categoryIndex, 1);

            var stateObj = {
                ...this.state,
                menu: tempMenu,
                sidebarCategoryActiveIndex: tempMenu.length !== 0 ? 0 : -1,
                sidebarCategoryActiveId: tempMenu.length !== 0 ? tempMenu[0].categoryId : undefined,
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
        this.handleModalCreateEditShow({
            isHidden: false,
            imageUrl: "",
            imageOrientationLandscape: true,
            menuItemTitle: "",
            description: "",
            price: "0.00",
            tagsAll: false,
            tags: {
                vg: false,
                v: false,
                gf: false
            }
        }, true);
    }

    handleButtonDuplicateMenuItem = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr.categoryId === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                return curr.menuItemId === this.state.menuItemId;
            });
            if (menuItemIndex !== -1) {
                var menuItem = JSON.parse(JSON.stringify(tempMenu[categoryIndex].menuItems[menuItemIndex]));
                menuItem.menuItemId = uuidv4();
                tempMenu[categoryIndex].menuItems.splice(menuItemIndex, 0, menuItem);
                this.setState({
                    ...this.state,
                    menu: tempMenu
                });
            }
        }
    }

    handleButtonEditMenuItem = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr.categoryId === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                return curr.menuItemId === this.state.menuItemId;
            });
            if (menuItemIndex !== -1) {
                var modalCreateEditMenuItem = JSON.parse(JSON.stringify(tempMenu[categoryIndex].menuItems[menuItemIndex]));
                console.log(modalCreateEditMenuItem);
                this.handleModalCreateEditShow({
                    isHidden: modalCreateEditMenuItem.isHidden,
                    imageUrl: modalCreateEditMenuItem.imageUrl,
                    imageOrientationLandscape: modalCreateEditMenuItem.imageOrientationLandscape,
                    menuItemTitle: modalCreateEditMenuItem.menuItemTitle,
                    description: modalCreateEditMenuItem.description,
                    price: modalCreateEditMenuItem.price.toFixed(2),
                    tagsAll: (modalCreateEditMenuItem.tags.vg && modalCreateEditMenuItem.tags.v && modalCreateEditMenuItem.tags.gf),
                    tags: {
                        vg: modalCreateEditMenuItem.tags.vg,
                        v: modalCreateEditMenuItem.tags.v,
                        gf: modalCreateEditMenuItem.tags.gf
                    }
                }, false);
            }
        }

    }




    handleButtonDeleteMenuItem = () => {
        var tempMenu = [...this.state.menu];
        var categoryIndex = tempMenu.findIndex(curr => {
            return curr.categoryId === this.state.sidebarCategoryActiveId;
        });
        if (categoryIndex !== -1) {
            var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                return curr.menuItemId === this.state.menuItemId;
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
        axios.put("/api/menubuilder/save", { updatedAt: parseInt(moment().format("X")), menuId: this.state.menuId, menu: this.state.menu }, { headers: { Authorization: "Bearer " + this.state.token } })
            .then(response => {
                // console.log(response.data);
            });
    }

    // ////////////////////////////////////////////////////////////////////

    handleModalCreateEditShow = (modalCreateEditMenuItem, modalCreateEditModeIsCreate) => {
        this.setState({
            ...this.state,
            modalCreateEditIsShown: true,
            modalCreateEditMenuItem: modalCreateEditMenuItem,
            modalCreateEditModeIsCreate: modalCreateEditModeIsCreate,
        });
    }
    handleModalCreateEditClose = () => {
        this.setState({
            ...this.state,
            modalCreateEditIsShown: false,
        });
    }
    handleModalCreateEditExited = () => {
        this.setState({
            ...this.state,
            modalCreateEditMenuItem: {
                isHidden: false,
                imageUrl: "",
                imageOrientationLandscape: true,
                menuItemTitle: "",
                description: "",
                price: "",
                tagsAll: false,
                tags: {
                    vg: false,
                    v: false,
                    gf: false
                }
            }
        });
    }





    handleModalCreateEditInputImageUrlChange = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            modalCreateEditMenuItem.imageUrl = e.currentTarget.value;

            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }
    handleModalCreateEditToggleLandscape = (isLandscape) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            modalCreateEditMenuItem.imageOrientationLandscape = isLandscape;

            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }
    handleModalCreateEditInputTitleChange = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            modalCreateEditMenuItem.menuItemTitle = e.currentTarget.value;

            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }
    handleModalCreateEditInputDescriptionChange = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            modalCreateEditMenuItem.description = e.currentTarget.value;

            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }
    handleModalCreateEditInputPriceChange = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            var priceString = e.currentTarget.value;

            if (
                priceString.search(/^\d{0,}\u002E\d{0,2}$/) !== -1
                || priceString.search(/^\d{0,}$/) !== -1
            ) {

                modalCreateEditMenuItem.price = priceString;

                this.setState({
                    modalCreateEditMenuItem: modalCreateEditMenuItem
                });
            }
        }
    }
    handleModalCreateEditInputTagAll = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            if (modalCreateEditMenuItem.tags.v && modalCreateEditMenuItem.tags.vg && modalCreateEditMenuItem.tags.gf) {
                modalCreateEditMenuItem.tagsAll = false;
                modalCreateEditMenuItem.tags.v = false;
                modalCreateEditMenuItem.tags.vg = false;
                modalCreateEditMenuItem.tags.gf = false;
            } else {
                modalCreateEditMenuItem.tagsAll = true;
                modalCreateEditMenuItem.tags.v = true;
                modalCreateEditMenuItem.tags.vg = true;
                modalCreateEditMenuItem.tags.gf = true;
            }
            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }
    handleModalCreateEditInputTagV = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            modalCreateEditMenuItem.tags.v = !modalCreateEditMenuItem.tags.v;
            if (modalCreateEditMenuItem.tags.v && modalCreateEditMenuItem.tags.vg && modalCreateEditMenuItem.tags.gf) {
                modalCreateEditMenuItem.tagsAll = true;
            } else {
                modalCreateEditMenuItem.tagsAll = false;
            }

            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }
    handleModalCreateEditInputTagVg = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            modalCreateEditMenuItem.tags.vg = !modalCreateEditMenuItem.tags.vg;
            if (modalCreateEditMenuItem.tags.v && modalCreateEditMenuItem.tags.vg && modalCreateEditMenuItem.tags.gf) {
                modalCreateEditMenuItem.tagsAll = true;
            } else {
                modalCreateEditMenuItem.tagsAll = false;
            }

            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }
    handleModalCreateEditInputTagGF = (e) => {
        if (this.state.modalCreateEditMenuItem) {
            var modalCreateEditMenuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));
            modalCreateEditMenuItem.tags.gf = !modalCreateEditMenuItem.tags.gf;
            if (modalCreateEditMenuItem.tags.v && modalCreateEditMenuItem.tags.vg && modalCreateEditMenuItem.tags.gf) {
                modalCreateEditMenuItem.tagsAll = true;
            } else {
                modalCreateEditMenuItem.tagsAll = false;
            }

            this.setState({
                modalCreateEditMenuItem: modalCreateEditMenuItem
            });
        }
    }

    // https://www.pedestrian.tv/content/uploads/2019/03/sonic-637x397.jpg
    handleModalButtonSave = () => {
        var menuItem = JSON.parse(JSON.stringify(this.state.modalCreateEditMenuItem));


        var menuItemImageUrl = menuItem.imageUrl.trim();

        if (menuItemImageUrl.length > 0) {
            menuItem.imageUrl = menuItemImageUrl;
        } else {
            menuItem.imageUrl = "https://media.giphy.com/media/42veFaIwEoPETh9gNB/giphy.gif";
            menuItem.imageOrientationlandscape = true;
        }

        menuItem.menuItemTitle = menuItem.menuItemTitle.trim();
        menuItem.description = menuItem.description.trim();
        menuItem.price = menuItem.price.trim();
        if (menuItem.menuItemTitle.length > 0 && menuItem.price.length > 0) {
            if (menuItem.price === ".") {
                menuItem.price = "0";
            }
            var priceFloat = parseFloat(menuItem.price);
            menuItem.price = priceFloat;
            this.setState({
                ...this.state,
                pricetext: priceFloat.toFixed(2)
            });
            var tempMenu = [...this.state.menu];
            var categoryIndex = tempMenu.findIndex(curr => {
                return curr.categoryId === this.state.sidebarCategoryActiveId;
            });
            if (this.state.modalCreateEditModeIsCreate) {
                menuItem.menuItemId = uuidv4();
                tempMenu[categoryIndex].menuItems.push(menuItem);
            } else {
                if (categoryIndex !== -1) {
                    var menuItemIndex = tempMenu[categoryIndex].menuItems.findIndex(curr => {
                        return curr.menuItemId === this.state.menuItemId;
                    });
                    if (menuItemIndex !== -1) {

                        tempMenu[categoryIndex].menuItems[menuItemIndex].isHidden = menuItem.isHidden;
                        tempMenu[categoryIndex].menuItems[menuItemIndex].imageUrl = menuItem.imageUrl;
                        tempMenu[categoryIndex].menuItems[menuItemIndex].imageOrientationLandscape = menuItem.imageOrientationLandscape;
                        tempMenu[categoryIndex].menuItems[menuItemIndex].menuItemTitle = menuItem.menuItemTitle;
                        tempMenu[categoryIndex].menuItems[menuItemIndex].description = menuItem.description;
                        tempMenu[categoryIndex].menuItems[menuItemIndex].price = menuItem.price;
                        tempMenu[categoryIndex].menuItems[menuItemIndex].tags = menuItem.tags;
                    }
                }
            }


            this.setState({
                ...this.state,
                menu: tempMenu,
                modalCreateEditIsShown: false,
            });
        } else {
            console.log("missing some values");
        }
    }


    render() {
        var categoriesArr = [];
        var menuItemsArr = [];
        if (this.state.menu.length !== 0 && this.state.sidebarCategoryActiveId !== undefined) {
            categoriesArr = this.state.menu.map((curr, i) => {
                return (
                    <div key={i} className="d-flex my-3">
                        <button className={curr.categoryId === this.state.sidebarCategoryActiveId ? ("button--transparent w-100 py-2 active") : ("button--transparent bg-secondary w-100 py-2 ")}
                            onClick={() => { this.handleSidebarCategoryOptionClick(curr.categoryId) }}>
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
                                onClick={() => { this.handleMenuItemOptionClick(curr.menuItemId) }}
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
                        <div className="row m-0 mt-3 px-2 px-lg-0 overflow-hidden flex-nowrap shadow-sm bg-white py-3">
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
                                    disabled={this.state.menuItemActiveIndex === -1 ? true : false}
                                    onClick={this.handleButtonEditMenuItem}>
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
                        style={{ zIndex: "60" }}></div>
                    )
                    :
                    ""
                }
                <Modal className="modalMinWidth" show={this.state.modalCreateEditIsShown} onHide={this.handleModalCreateEditClose} onExited={this.handleModalCreateEditExited} centered size="lg" backdrop={"static"}>
                    <ModalHeader className="m-0 p-0 border-0">
                        <button
                            className="ml-auto button--transparent color-black-05 customerModalCloseButton p-2"
                            onClick={this.handleModalCreateEditClose}>
                            <i className="material-icons font-30">close</i>
                        </button>
                    </ModalHeader>
                    {
                        this.state.modalCreateEditMenuItem ?
                            (
                                <>
                                    <ModalBody className="p-0 px-3">

                                        <div className="row pb-2">
                                            <div className="col-12 col-md-auto d-flex align-items-center">
                                                <label htmlFor="inputUrl" className="font-14 color-black-04 m-0 py-2" style={{ width: "90px" }}><b>Image URL</b></label>
                                            </div>
                                            <div className="col-12 col-md">
                                                <input id="inputUrl" type="text"
                                                    className="form-control rounded-0 font-14"
                                                    value={this.state.modalCreateEditMenuItem.imageUrl}
                                                    onChange={this.handleModalCreateEditInputImageUrlChange}
                                                    placeholder="(Optional)" />
                                            </div>
                                            <div className="w-100 mb-3 d-none d-md-block"></div>
                                            <div className="d-none d-md-block col-md-auto d-flex align-items-center">
                                                <label htmlFor="inputUrl" className="font-14 color-black-04 m-0 py-2" style={{ width: "90px" }}></label>
                                            </div>
                                            <div className="col-12 col-md-auto">
                                                <div className="d-flex overflow-hidden">
                                                    <button
                                                        className={this.state.modalCreateEditMenuItem.imageOrientationLandscape ?
                                                            "button--transparent bg-primary color-white rounded-0 p-2"
                                                            :
                                                            "button--transparent bg-light color-black rounded-0 p-2"}
                                                        onClick={() => { this.handleModalCreateEditToggleLandscape(true) }}>
                                                        Landscape
                                                    </button>
                                                    <button
                                                        className={this.state.modalCreateEditMenuItem.imageOrientationLandscape ?
                                                            "button--transparent bg-light color-black rounded-0 p-2"
                                                            :
                                                            "button--transparent bg-primary color-white rounded-0 p-2"}
                                                        onClick={() => { this.handleModalCreateEditToggleLandscape(false) }}>
                                                        Portrait
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row py-2">
                                            <div className="col-12 col-md-auto">
                                                <label htmlFor="inputTitle" className="font-14 color-black-04 m-0 py-2" style={{ width: "90px" }}><b>Title<span className="color-black">*</span></b></label>
                                            </div>
                                            <div className="col-12 col-md">
                                                <input id="inputTitle" type="text" className="form-control rounded-0 font-14" value={this.state.modalCreateEditMenuItem.menuItemTitle} onChange={this.handleModalCreateEditInputTitleChange} />
                                            </div>
                                        </div>








                                        <div className="row py-2">
                                            <div className="col-12 col-md-auto">
                                                <label htmlFor="inputDescription" className="font-14 color-black-04 m-0 py-2" style={{ width: "90px" }}><b>Description</b></label>
                                            </div>
                                            <div className="col-12 col-md">
                                                <textarea id="inputDescription" type="text"
                                                    className="form-control rounded-0 font-14"
                                                    value={this.state.modalCreateEditMenuItem.description}
                                                    onChange={this.handleModalCreateEditInputDescriptionChange}
                                                    placeholder="(Optional)"></textarea>
                                            </div>
                                        </div>

                                        <div className="row py-2">
                                            <div className="order-2 order-sm-1 col-12 col-sm">
                                                <div className="d-flex align-items-center py-2 mt-3 mt-sm-0">
                                                    <input type="checkbox" id="tagAll"
                                                        checked={this.state.modalCreateEditMenuItem.tagsAll}
                                                        onChange={this.handleModalCreateEditInputTagAll} />
                                                    <label className="font-14 color-black-04 m-0 ml-2" htmlFor="tagAll"><b>Tag</b></label>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6 col-sm-12 col-lg-6">
                                                        <div className="d-flex align-items-center py-2">
                                                            <input type="checkbox" id="tagVegan" checked={this.state.modalCreateEditMenuItem.tags.vg} onChange={this.handleModalCreateEditInputTagVg} />
                                                            <label className="m-0 ml-2 text-nowrap font-14" htmlFor="tagVegan">
                                                                <span className="badge badge-pill table-success mx-1 py-1">Vg</span>
                                                                <span className="d-none d-sm-inline">Vegan</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 col-sm-12 col-lg-6">
                                                        <div className="d-flex align-items-center py-2">
                                                            <input type="checkbox" id="tagVegetarian" checked={this.state.modalCreateEditMenuItem.tags.v} onChange={this.handleModalCreateEditInputTagV} />
                                                            <label className="m-0 ml-2 text-nowrap font-14" htmlFor="tagVegetarian">
                                                                <span className="badge badge-pill badge-success mx-1 py-1">V</span>
                                                                <span className="d-none d-sm-inline">Vegetarian</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 col-sm-12 col-lg-6">
                                                        <div className="d-flex align-items-center py-2">
                                                            <input type="checkbox" id="tagGlutenFree" checked={this.state.modalCreateEditMenuItem.tags.gf} onChange={this.handleModalCreateEditInputTagGF} />
                                                            <label className="m-0 ml-2 text-nowrap font-14" htmlFor="tagGlutenFree">
                                                                <span className="badge badge-pill badge-warning mx-1 py-1">GF</span>
                                                                <span className="d-none d-sm-inline">Gluten Free</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-1 order-sm-2 col-12 col-sm-auto">
                                                <label className="font-14 color-black-04 m-0 py-2" htmlFor="inputPrice"><b>Price<span className="color-black">*</span></b></label>
                                                <div>
                                                    <div className="d-flex align-items-end">
                                                        <label htmlFor="inputPrice" className="m-0 py-2 mr-2"><b>$</b></label>
                                                        <input id="inputPrice" type="text" className="form-control rounded-0 font-14" value={this.state.modalCreateEditMenuItem.price} onChange={this.handleModalCreateEditInputPriceChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter className="border-0 justify-content-center px-0">
                                        <div className="row w-100 justify-content-center mx-2">
                                            <div className="col-12 order-1">
                                                <p className="text-center">Create this item?</p>
                                            </div>
                                            <div className="order-2 order-sm-3 col-12 col-sm-6 col-md-4 mb-2 mb-sm-0 px-2">
                                                <button
                                                    className="button--transparent bg-danger h-100 w-100 color-white py-2"
                                                    onClick={this.handleModalCreateEditClose}>
                                                    NO
                                        </button>
                                            </div>
                                            <div className="order-2 order-sm-3 col-12 col-sm-6 col-md-4 mb-2 mb-sm-0 px-2">
                                                <button
                                                    className="button--transparent bg-success h-100 w-100 color-white py-2"
                                                    disabled={this.state.modalCreateEditMenuItem.menuItemTitle.trim().length > 0 && this.state.modalCreateEditMenuItem.price.trim().length > 0 ? false : true}
                                                    onClick={this.handleModalButtonSave}>
                                                    YES
                                        </button>
                                            </div>
                                        </div>
                                    </ModalFooter>
                                </>
                            )
                            :
                            ""
                    }

                </Modal>
            </div>
        );
    }
}

export default MenuBuilder;