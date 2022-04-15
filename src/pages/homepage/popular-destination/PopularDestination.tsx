import React from 'react'
import { useTranslation } from 'react-i18next'


const destinationdta = [
    {
        id: 1, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },

    {
        id: 2, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },


    {
        id: 3, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },


    {
        id: 4, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },

    {
        id: 5, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },


    {
        id: 6, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },


    {
        id: 7, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },


    {
        id: 8, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },


    {
        id: 9, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },


    {
        id: 10, 
        des_title: "Kyungguksa Templestay", 
        des_subtitle: "Seoul, South Korea" ,
    },

    
]


function PopularDestination() {
    const {t} =useTranslation();
    return (
        <div className="destination-list p-2 mb-5">
            <h5 className="main-title text-left">{t ('Homepage.Popular_Destination')}</h5>
        {destinationdta.slice(0, 2).map((items) => 
            <div className="d-flex mt-5">
                <div className="">
                    <p className="id-number">{items.id}</p>
                </div>
                <div className="text-left">
                    <h5 className="des_title">{items.des_title}</h5>
                    <h6 className="des_subtitle">{items.des_subtitle}</h6>
                </div>
            </div>
        )}
        </div>
    )
}

export default PopularDestination
