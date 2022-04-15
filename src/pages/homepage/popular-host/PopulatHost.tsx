import React from 'react'
import { useTranslation } from 'react-i18next'


const destinationdta = [
    {
        id: 1,
        hostimg: "./img/user1.png", 
        hostname: "James", 
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },

    {
        id: 2,
        hostimg: "./img/user1.png", 
        hostname: "James", 
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },


    {
        id: 3,
        hostimg: "./img/user1.png", 
        hostname: "James", 
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },


    {
        id: 4,
        hostimg: "./img/user1.png", 
        hostname: "James", 
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },

    {
        id: 5, 
        hostimg: "./img/user1.png", 
        hostname: "James", 
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },


    {
        id: 6,
        hostimg: "./img/user1.png", 
        hostname: "James",  
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },


    {
        id: 7,
        hostimg: "./img/user1.png", 
        hostname: "James", 
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },


    {
        id: 8,
        hostimg: "./img/user1.png", 
        hostname: "James",  
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },


    {
        id: 9,
        hostimg: "./img/user1.png", 
        hostname: "James",  
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },


    {
        id: 10,
        hostimg: "./img/user1.png", 
        hostname: "James", 
        hostcity: "Seoul" ,
        hoststate: "South Korea",
        hostcityimg:"/img/hostcity.png",
    },

    
]


function PopulatHost() {

    const {t} = useTranslation();

    return (
        <div className="destination-list p-2 pt-5">
            <h5 className="main-title text-left">{t ('Homepage.Popular_Hosts')}</h5>
        {destinationdta.slice(0, 10).map((items) => 
            <div className="d-flex mt-5">
                <div className="">
                    <img className="id-number hostimg" src={items.hostimg}/>
                </div>
                <div className="text-left host-datas mx-2">
                    <h5 className="des_title">{items.hostname}</h5>
                    <h6 className="des_subtitle">{items.hostcity} , {items.hoststate} </h6>
                </div>
                <div className="align-item-center">
                    <img className="id-number hoscitytimg" src={items.hostcityimg}/>
                </div>
            </div>
        )}
        </div>
    )
}

export default PopulatHost
