import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import Axios from "axios";
import loader from "react-loader-spinner";
//const [spinnerLoading, setSpinnerLoading] = useState(true);

let tourCartData = [
    {
        id: "0",
        tourprofile: "./img/card.png",
        tourname: "Turkey Hot Air Balloon",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "festive",
        isLiked: false,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },


    {
        id: "1",
        tourprofile: "./img/card1.png",
        tourname: "Gwakji Beach Surfing ..",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "local",
        isLiked: true,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },


    {
        id: "2",
        tourprofile: "./img/card2.png",
        tourname: "Kayaking on a Dutch L..",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "local",
        isLiked: false,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },



    {
        id: "3",
        tourprofile: "./img/card3.png",
        tourname: "Kyungguksa Templestay",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "popular",
        isLiked: true,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },


    {
        id: "4",
        tourprofile: "./img/card4.png",
        tourname: "Jeju Aewol Beach Trip",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "kpop",
        isLiked: true,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },

    {
        id: "5",
        tourprofile: "./img/card1.png",
        tourname: "Kyungguksa Templestay",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "kpop",
        isLiked: true,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },


    {
        id: "6",
        tourprofile: "./img/card2.png",
        tourname: "Kökenhof",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "kpop",
        isLiked: true,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },


    {
        id: "7",
        tourprofile: "./img/card.png",
        tourname: "Amsterdam",
        tourcreater: "Compastrips",
        tourcity: "Ankara",
        tourstate: "Turkey",
        tourstar: "4.9",
        tourtotalreview: "17",
        tourdate: "August 1, 2021 09:00 - 18:00",
        totalhost: "3",
        search: "kpop",
        isLiked: true,
        tourtages: [
            "Turkey Hot Air", "Turkey", "Jeju", "Surfer", "Gwakji Beach", "Turkey", "Jeju"
        ]
    },

];


function Tourlist() {
    const [tourCart, setTourCart] = useState(tourCartData)
    const [activeTab, setActiveTab] = useState("all")
    const [userdata, setuserData] = useState<any>([])
    const [load, setLoad] = useState(1);
    const [spinnerLoading, setSpinnerLoading] = useState(true);


    useEffect(() => {
        setLoad(0)
        forusers();
    }, [])

    const forusers=async ()=>{
        setLoad(1);
        try {
            Axios.get('http://192.168.56.1:5000/api/test/alluser')
            .then(function (response) {
                 console.log("newsssssssssssssss",response.data.data);
                 setuserData(response.data.data);
                 
            })
            .catch(function (error) {
               console.log("vivek");
               
            });
        } catch (error) {
            console.log("item error");
            
        }
    }

    const Search = (tab: string) => {
        if (tab == "all") {
            console.log("all");
            setTourCart(tourCartData)

        } else {
            setTourCart(tourCartData.filter((data) => data.search == tab))
        }

        setActiveTab(tab);
    }

    const {t} = useTranslation();


    if(!(load)){
        return(
            <div style={{ textAlign: "center" }}>
            <br></br>
            <br></br>

            <text>loading....</text>

            <br></br>
            <button onClick={() => setSpinnerLoading(!spinnerLoading)}>Toggle Loader</button>
        </div>
         )
    }else{
        return (
            <>
                <div>
                    {/* <ul className="tab-links">
                        <li onClick={() => Search('all')}><Link to="/" className={activeTab == "all" ? "active" : ''}>{t ('Homepage.NavBar.All')}</Link></li>
                        <li onClick={() => Search('local')}><Link to="/" className={activeTab == "local" ? "active" : ''}>{t ('Homepage.NavBar.Local_Picks')}</Link></li>
                        <li onClick={() => Search('kpop')}><Link to="/" className={activeTab == "kpop" ? "active" : ''}>K-pop</Link></li>
                        <li onClick={() => Search('festive')}><Link to="/" className={activeTab == "festive" ? "active" : ''}>{t ('Homepage.NavBar.Festivals')}</Link></li>
                        <li onClick={() => Search('popular')}><Link to="/" className={activeTab == "popular" ? "active" : ''}>{t ('Homepage.NavBar.Popular')}</Link></li>
                    </ul> */}
                </div>
                <div className="p-md-5 p-1">
                    {userdata.map((items:any) =>
                        <Row className="card-box mb-4">
    
                            <Col md={4} className="p-0">
                                <div className="card-image-main">
                                    <img src={items?.employeeipath} className="w-100" />
                                </div>
                            </Col>
                            <Col md={8} className="p-0">
    
                                <div className="main-tour-card-data">
                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>{items?.firstname}{' '}{items?.lastname}</h4>
                                        </div>
                                        <div className="tout-created ml-auto">
                                            <p><span> {items?.country}  </span></p>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>{items?.bDay}{'/'}{items?.bMonth}{'/'}{items?.bYear}</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Email{':-'}{items?.email}</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Mobile No{':-'}{items?.phonenumber}</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Gender{':-'}{items?.gender}</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Salary{':-'}{items?.employeeselery}</h4>
                                        </div>
                                    </div>

                                    
    
                                    <div className="d-flex w-100">
                                        {/* <div className="tour-card-address">
                                            <h4>{items?.tourcity} </h4>
                                            <div className="d-flex mt-2">
                                                <div>
                                                    <FontAwesomeIcon icon={faStar} className="fill-star" />
                                                    <FontAwesomeIcon icon={faStar} className="fill-star" />
                                                    <FontAwesomeIcon icon={faStar} className="fill-star" />
                                                    <FontAwesomeIcon icon={faStar} className="fill-star" />
                                                    <FontAwesomeIcon icon={faStar} />
                                                </div>
                                                <div className="ml-4 star-reviews">
                                                    <p> {items?.tourstar} ∙ Reviews {items?.tourtotalreview} </p>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className="tout-created ml-auto">
                                            <div className="download-heart-icon button d-flex">
                                                <div className="heart-div">
                                                    <input type="checkbox" id={items?.id} className="instruments" />
                                                    <label htmlFor={items?.id} className="text-white check" ><img src="./img/heart.png" className=" w-20" /></label>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
    
                                    {/* <div className="tages">
                                        {items?.tourtages.map((tourtag: any) =>
                                            <p className="single-tag">
                                                {tourtag}
                                            </p>
                                        )}
    
                                    </div>
     */}
                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data-date">
                                            <h4>{items?.tourdate}</h4>
                                        </div>
                                        <div className="tout-created-host ml-auto">
                                            <p>  <span> {items?.employeerole} </span></p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
    
                        </Row>
                    )}
                </div>
            </>
        )
    }

}

export default Tourlist
