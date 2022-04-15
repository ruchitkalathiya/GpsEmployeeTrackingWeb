import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Hero from './Hero'
import PopularDestination from './popular-destination/PopularDestination';
import PopulatHost from './popular-host/PopulatHost';
import Tourlist from './tourcard/Tourlist';


function HomePage() {
    const handleDateSelect = () => {

    }
    
    const handleDateChange = () => {
        console.log();
        
    }

    return (
        <>
        <div>
            {/* <Hero date={new Date()} handleDateSelect={handleDateSelect} handleDateChange={handleDateChange} /> */}
            <Hero />
        </div>

        {/* <Container className="bottom-hero-content">
            <Row>
                <Col lg={9} className="order-lg-12">
                    <Tourlist/>
                </Col>
                <Col lg={3} className="p-0 order-lg-1">
                    <PopularDestination/>
                    <PopulatHost/>
                </Col>
                
            </Row>
        </Container> */}
        </>
    )
}

export default HomePage
