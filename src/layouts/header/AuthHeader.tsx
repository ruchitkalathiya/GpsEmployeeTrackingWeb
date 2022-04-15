import { Container, Image, Nav, Navbar, Modal, Col, Row, Form, Button} from 'react-bootstrap'
import { Dropdown, DropdownButton } from "react-bootstrap"
import Buttons from '../../components/Buttons';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'

const AuthHeader: React.FC =() => {
    const {t} = useTranslation();
    return(
        <div>
                <Navbar collapseOnSelect expand="lg" className="header">
                    <Container fluid>
                        <Navbar.Brand><Link to="/"><h2 className="text-white">EmployeeGPS</h2></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav ">
                            <Nav className="ml-auto menu-link">
                                {/* <DropdownButton title={t('Select_Language')} onSelect={function (evt) { i18next.changeLanguage() }} className="select-btn">
                                    <Dropdown.Item>
                                        <Button onClick={() => { i18next.changeLanguage("en") }} >English</Button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Button onClick={() => { i18next.changeLanguage('ko') }}>Korean</Button>
                                    </Dropdown.Item>
                                </DropdownButton> */}
                                {/* <Buttons ButtonStyle="btn-outline-light ml-md-2 mt-4 mt-md-0 btn-lg" onClick={()=> console.log("You clicked on the pink circle!")}>
                                    <span>{t ('Add Employee')}</span>
                                </Buttons>

                                <Buttons ButtonStyle="btn-customs-transparent ml-md-2  mt-md-0 btn-lg" onClick={()=> console.log("You clicked on the pink circle!")}>
                                    <span>{t ('View Location')}</span>
                                </Buttons>

                                <Buttons ButtonStyle="btn-customs-transparent ml-md-2 mt-4 mt-md-0 btn-lg" onClick={()=> console.log("You clicked on the pink circle!")}>
                                    <span>{t ('View Image')}</span>
                                </Buttons>

                                <Buttons ButtonStyle="btn-customs-transparent ml-md-2 mt-4 mt-md-0 btn-lg" onClick={()=> console.log("You clicked on the pink circle!")}>
                                    <span>{t ('Change Password')}</span>
                                </Buttons>

                                <Buttons ButtonStyle="btn-customs-transparent  ml-md-2 mt-4 mt-md-0 btn-lg" onClick={()=> console.log("You clicked on the pink circle!")}>
                                    <span>{t ('Logout')}</span>
                                </Buttons> */}

                                <div className="footer-link">
                                    {/* <Link to="/dashboard">{'Add Employee'}</Link> */}
                                    <Link to="/viewloaction">{'View Location'}</Link>
                                    <Link to="/Viewimage">{'View Image'}</Link>
                                    {/* <Link to="/">{'Change Password'}</Link> */}
                                    <Link to="/">{'Logout'}</Link>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
    )
}

export default AuthHeader;