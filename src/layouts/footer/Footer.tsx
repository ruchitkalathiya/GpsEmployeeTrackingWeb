import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import logo from '../../img/user1.png';
import { useTranslation } from 'react-i18next';

function Footer() {

        useEffect(() => {
            addResponseMessage('How Can i Help You');
        }, []);
        
        const handleNewUserMessage = (newMessage: any) => {
            console.log(`New message incoming! ${newMessage}`);
        };
        
    const {t} = useTranslation();

    return (
        <>
        <Container fluid className="footer-bg">
            <Row>
                <Col md={2}>
                    <h2 className="text-black">EmployeeGPS</h2>
                </Col>
                <Col md={10}>
                    <div className="footer-link">
                        <Link to="/">{t ('Footer.Terms_of_Use')}</Link>
                        <Link to="/">{t ('Footer.Privacy_Policy')}</Link>
                        <Link to="/">{t ('Footer.Inquiries')}</Link>
                        <Link to="/">{t ('Footer.Customer_Service')}</Link>
                        <Link to="/">{t ('Footer.Service_Introduction')}</Link>
                    </div>
                    <p className="footer-copyright">Copyright © Compas Interactive Inc. ALL RIGHTS RESERVED.</p>
                </Col>
            </Row>
        </Container>

        <div className="Footer">
            <Widget
            handleNewUserMessage={handleNewUserMessage}
            profileAvatar={logo}
            showTimeStamp
            title="Gildong Hong"
            subtitle=""
            />
        </div>

        </>
    )
}

export default Footer
