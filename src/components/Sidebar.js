import React, {useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import {Link, useLocation} from "react-router-dom";
import {CSSTransition} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFile, faSignOutAlt, faTimes, faUser} from "@fortawesome/free-solid-svg-icons";
import {Accordion, Badge, Button, Image, Nav, Navbar} from '@themesberg/react-bootstrap';
import Cookie from 'js-cookie';
import {Routes} from "../routes";
import DOfficeLogo from "../assets/img/348801.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
import {useDispatch, useSelector} from "react-redux";
import countDispatchActions from "../actions/countDispatchActions";
import {ROLE_META_DATA_KEYS} from "../constants/app";

export default (props = {}) => {
    const location = useLocation();
    const {pathname} = location;
    const [show, setShow] = useState(false);
    const showClass = show ? "show" : "";
    const dispatch = useDispatch();
    const onCollapse = () => setShow(!show);
    const {user} = useSelector(state => state.authentication);
    const {countDispatch} = useSelector(state => state.countDispatch);

    const searchParams = new URLSearchParams(location.search);
    const dispatchStatus = searchParams.get('status');

    const signOut = () => {
        Cookie.remove('authToken');
        window.location.href = '/';
    }

    useEffect(() => {
        dispatch(countDispatchActions.getCountDispatch());
    }, [])

    const CollapsableNavItem = (props) => {
        const {eventKey, title, icon, children = null} = props;
        const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";
        return (
            <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
                <Accordion.Item eventKey={eventKey}>
                    <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
                    <span>
                      <span className="sidebar-icon"><FontAwesomeIcon icon={icon}/> </span>
                      <span className="sidebar-text">{title}</span>
                    </span>
                    </Accordion.Button>
                    <Accordion.Body className="multi-level">
                        <Nav className="flex-column">
                            {children}
                        </Nav>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    };

    const NavItem = (props) => {
        const {
            title,
            link,
            external,
            target,
            icon,
            image,
            badgeText,
            badgeBg = "secondary",
            badgeColor = "primary"
        } = props;
        const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
        let navItemClassName = '', pathname1 = '';
        if (dispatchStatus) { // nếu có status
            pathname1 = pathname + '?status=' + dispatchStatus;
            if (link === pathname1) {
                navItemClassName = "active";
            }
        } else {  // nếu không có status
            navItemClassName = link === pathname ? "active" : "";
        }
        const linkProps = external ? {href: link} : {as: Link, to: link};
        return (
            <Nav.Item className={navItemClassName} onClick={() => navItemClick(link)}>
                <Nav.Link {...linkProps} target={target} className={classNames}>
                  <span>
                    {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon}/> </span> : null}
                      {image ? <Image style={{width: '50px', height: '50px'}} src={image} width={20} height={20}
                                      className="sidebar-icon svg-icon"/> : null}
                      <span className="sidebar-text">{title}</span>
                  </span>
                    {badgeText ? (
                        <Badge pill bg={badgeBg} text={badgeColor}
                               className="badge-md notification-count ms-2">{badgeText}
                        </Badge>
                    ) : null}
                </Nav.Link>
            </Nav.Item>
        );
    };

    const navItemClick = (link) => {
        setShow(false);
        // console.log(1111222, link, currentNavItem);
    }

    return (
        <>
            <Navbar expand={false} variant="dark" className="navbar-theme-primary px-4 d-md-none">
                <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
                    <Image src={DOfficeLogo} className="navbar-brand-light"/>
                </Navbar.Brand>
                <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
                    <span className="navbar-toggler-icon"/>
                </Navbar.Toggle>
            </Navbar>


            <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
                <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                    <div className="sidebar-inner px-4 pt-3">
                        <div
                            className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                            <div className="d-flex align-items-center">
                                <div className="user-avatar lg-avatar me-4">
                                    <Image src={ProfilePicture} className="card-img-top rounded-circle border-white"/>
                                </div>
                                <div className="d-block">
                                    <h6>Hi, Jane</h6>
                                    <Button onClick={signOut} variant="secondary" size="xs" className="text-dark">
                                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2"/> Sign Out
                                    </Button>
                                </div>
                            </div>
                            <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </Nav.Link>
                        </div>
                        <Nav className="flex-column pt-3 pt-md-0">
                            <NavItem title="D Office" link="/" image={DOfficeLogo}/>

                            {/* <NavItem title="Overview" link={Routes.DashboardOverview.path} icon={faChartPie} /> */}

                            {/* Tạm thời comment lại */}
                            { user?.roles?.some((role) => {
                              return role === ROLE_META_DATA_KEYS.systemAdmin;
                            }) && (<NavItem title="Quản lý người dùng" link={Routes.User.path} icon={faUser} />)}


                            <NavItem title="Quản lý người dùng" link={Routes.User.path} icon={faUser}/>

                            <CollapsableNavItem eventKey={location.pathname} title="Văn bản đến" icon={faFile}>
                                <NavItem title={`Tất cả (${countDispatch?.cdAll})`}
                                         link={`${Routes.ComingDispatchManagement.path}`} icon={faFile}/>
                                <NavItem title={`Chưa xử lý (${countDispatch?.cdNotDone})`}
                                         link={`${Routes.ComingDispatchManagement.path}?status=1`} icon={faFile}/>
                                <NavItem title={`Đã xử lý (${countDispatch?.cdDone})`}
                                         link={`${Routes.ComingDispatchManagement.path}?status=2`} icon={faFile}/>
                            </CollapsableNavItem>

                            {/*<CollapsableNavItem eventKey="tables/" title="Văn bản đi" icon={faFile}>*/}
                            {/*    <NavItem title={`Tất cả (${countDispatch?.ogAll})`}*/}
                            {/*             link={`${Routes.OutGoingDispatchManagement.path}`} icon={faFile}/>*/}
                            {/*    <NavItem title={`Chưa xử lý (${countDispatch?.ogNotDone})`}*/}
                            {/*             link={`${Routes.OutGoingDispatchManagement.path}?status=1`} icon={faFile}/>*/}
                            {/*    <NavItem title={`Chờ lãnh đơn vị (${countDispatch?.ogChoLanhDaoDonVi})`}*/}
                            {/*             link={`${Routes.OutGoingDispatchManagement.path}?status=3`} icon={faFile}/>*/}
                            {/*    <NavItem title={`Chờ lãnh cơ quan (${countDispatch?.ogChoLanhDaoCoQuan})`}*/}
                            {/*             link={`${Routes.OutGoingDispatchManagement.path}?status=4`} icon={faFile}/>*/}
                            {/*    <NavItem title={`Đã xử lý (${countDispatch?.ogDone})`}*/}
                            {/*             link={`${Routes.OutGoingDispatchManagement.path}?status=2`} icon={faFile}/>*/}
                            {/*</CollapsableNavItem>*/}


                            <CollapsableNavItem eventKey={location.pathname} title="Văn bản đi" icon={faFile}>
                                <NavItem title={`Tất cả (${countDispatch?.ogAll})`}
                                         link={`${Routes.OutGoingDispatchManagement.path}`} icon={faFile}/>
                                <NavItem title={`Chưa xử lý (${countDispatch?.ogNotDone})`}
                                         link={`${Routes.OutGoingDispatchManagement.path}?status=1`} icon={faFile}/>
                                <NavItem title={`Chờ lãnh đơn vị (${countDispatch?.ogChoLanhDaoDonVi})`}
                                         link={`${Routes.OutGoingDispatchManagement.path}?status=3`} icon={faFile}/>
                                <NavItem title={`Chờ lãnh cơ quan (${countDispatch?.ogChoLanhDaoCoQuan})`}
                                         link={`${Routes.OutGoingDispatchManagement.path}?status=4`} icon={faFile}/>
                                <NavItem title={`Đã xử lý (${countDispatch?.ogDone})`}
                                         link={`${Routes.OutGoingDispatchManagement.path}?status=2`} icon={faFile}/>
                            </CollapsableNavItem>

                            {/*
              <CollapsableNavItem eventKey="tables/" title="Tables" icon={faTable}>
                <NavItem title="Bootstrap Table" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="examples/" title="Page Examples" icon={faFileAlt}>
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
                <NavItem title="Reset password" link={Routes.ResetPassword.path} />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem title="500 Server Error" link={Routes.ServerError.path} />
              </CollapsableNavItem>

              <Dropdown.Divider className="my-3 border-indigo" />

              <CollapsableNavItem eventKey="components/" title="Components" icon={faBoxOpen}>
                <NavItem title="Accordion" link={Routes.Accordions.path} />
                <NavItem title="Alerts" link={Routes.Alerts.path} />
                <NavItem title="Badges" link={Routes.Badges.path} />
                <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Routes.Buttons.path} />
                <NavItem title="Forms" link={Routes.Forms.path} />
                <NavItem title="Modals" link={Routes.Modals.path} />
                <NavItem title="Navbars" link={Routes.Navbars.path} />
                <NavItem title="Navs" link={Routes.Navs.path} />
                <NavItem title="Pagination" link={Routes.Pagination.path} />
                <NavItem title="Popovers" link={Routes.Popovers.path} />
                <NavItem title="Progress" link={Routes.Progress.path} />
                <NavItem title="Tables" link={Routes.Tables.path} />
                <NavItem title="Tabs" link={Routes.Tabs.path} />
                <NavItem title="Toasts" link={Routes.Toasts.path} />
                <NavItem title="Tooltips" link={Routes.Tooltips.path} />
              </CollapsableNavItem> */}


                        </Nav>
                    </div>
                </SimpleBar>
            </CSSTransition>
        </>
    );
};
