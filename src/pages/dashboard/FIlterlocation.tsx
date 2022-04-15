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

let USERS = [
    { id: 1, name: 'Andy', age: 32 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Tom Hulk', age: 40 },
    { id: 4, name: 'Tom Hank', age: 50 },
    { id: 5, name: 'Audra', age: 30 },
    { id: 6, name: 'Anna', age: 68 },
    { id: 7, name: 'Tom', age: 34 },
    { id: 8, name: 'Tom Riddle', age: 28 },
    { id: 9, name: 'Bolo', age: 23 },
  ];


function FIlterlocation() {
    const [name, setName] = useState<any>();

    const [newuser, setNewuser] = useState<any>([]);
    const [tourCart, setTourCart] = useState(tourCartData)
    const [activeTab, setActiveTab] = useState("all")
    const [userdata, setuserData] = useState<any>([])
    const [load, setLoad] = useState(1);
    const [spinnerLoading, setSpinnerLoading] = useState(true);

    const [foundUsers, setFoundUsers] = useState(USERS);

    const filter = (e:any) => {
        const keyword = e.target.value;

        if (keyword !== '') {
        const results = userdata.filter((user:any) => {
            return user.userid.toLowerCase().startsWith(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
        });
        setuserData(results);
        } else {
            setuserData(USERS);
        // If the text field is empty, show all users
        }

        setName(keyword);
    };


    useEffect(() => {
        setLoad(0)
        forusers();
    }, [])

    const forusers=async ()=>{
        setLoad(1);
        try {
            Axios.get('http://192.168.56.1:5000/api/test/allusermaps')
            .then(function (response) {
                 console.log("newsss",response.data.data);
                 setuserData(response.data.data);
                //  Axios.post('http://192.168.56.1:5000/api/auth/finduserid',{ userid : response.data.data.userid})
                // .then(function (response) {
                //     console.log("newnew",response.data.data);
                //     setNewuser(response.data.data);
                    
                    
                // })
                // .catch(function (error) {
                // console.log("vivek");
                
               // });
                 
            })
            .catch(function (error) {
               console.log("vivek");
               
            });
        } catch (error) {
            console.log("item error");
            
        }
    }

    const getusers=async (nuserid:any)=>{
        //setLoad(1);
        console.log("hellodd");
        
        try {
            Axios.post('http://192.168.56.1:5000/api/auth/finduserid',{userid:nuserid})
            .then(function (response) {
                 console.log("newsshh",response.data.data);
                 setuserData(response.data.data);
                //  Axios.post('http://192.168.56.1:5000/api/auth/finduserid',{ userid : response.data.data.userid})
                // .then(function (response) {
                //     console.log("newnew",response.data.data);
                //     setNewuser(response.data.data);
                    
                    
                // })
                // .catch(function (error) {
                // console.log("vivek");
                
               // });
                 
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
                <div className="container">
                <input
                    type="search"
                    value={name}
                    onChange={filter}
                    className="input"
                    placeholder="Filter Location"
                />

                    <div className="user-list">
                    {userdata && userdata.length > 1 && name? (

                    <Row className="card-box mb-4">
                        
                    {console.log("uuu",userdata[0])}
                    
                                            <Col md={8} className="p-0">
 
                             <div className="main-tour-card-data">
                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>{userdata[0].firstname}{" "}{userdata[0].lastname}</h4>
                                        </div>
                                    </div>

                                    

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>{userdata[0].bDay}{'/'}{userdata[0].bMonth}{'/'}{userdata[0].bYear}</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Email{':-'}{userdata[0].email}</h4>
                                        </div>
                                    </div>


                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Gender{':-'}{userdata[0].gender}</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>employeerole{':-'}SDE</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>employeeselery{':-'}100050</h4>
                                        </div>
                                    </div>

                                    

                                    

                                                {/* <div className="main-tour-card-data">

                                                    <div className="d-md-flex w-100">
                                                        <div className="tour-card-data">
                                                            <h4>Latitute{':-'}{items?.employeelatitute}</h4>
                                                        </div>
                                                    </div>

                                                    <div className="d-md-flex w-100">
                                                        <div className="tour-card-data">
                                                            <h4>Longitute{':-'}{items?.employeelongitute}</h4>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                </div>
                                            </Col>

                                        </Row>   
                    ) : (
                    <h1>No results found!</h1>
                    )}
                </div>

                <div className="user-list">
                    {userdata && userdata.length > 0 && name? (

                            userdata.map((items:any) =>
                            // {getusers(items?.userid)}
                            <Row className="card-box mb-4">


                            <Col md={8} className="p-0">

                                <div className="main-tour-card-data">
                                
                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Latitute{':-'}{items?.employeelatitute}</h4>
                                        </div>
                                    </div>

                                    <div className="d-md-flex w-100">
                                        <div className="tour-card-data">
                                            <h4>Longitute{':-'}{items?.employeelongitute}</h4>
                                        </div>
                                    </div>

                                
                                </div>
                            </Col>

                            </Row>

                            ))
                    // userdata.map((user:any) => (
                    //     <li key={user.id} className="user">
                    //     <span className="user-id">{user.id}</span>
                    //     <span className="user-name">{user.name}</span>
                    //     <span className="user-age">{user.age} year old</span>
                    //     </li>
                    // ))
                     : (
                    <></>
                    )}
                </div>

                </div>
                {/* <div className="p-md-5 p-1">
                    {userdata.map((items:any) =>
                        <Row className="card-box mb-4">
    
                            <Col md={4} className="p-0">
                                <div className="card-image-main">
                                    <img src={items?.employeeipath} className="w-100" />
                                </div>
                            </Col>
                           
    
                        </Row>
                    )}
                </div> */}
            </>
        )
    }

}

export default FIlterlocation
