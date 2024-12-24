import React from "react";

const Weather = ({weather}) => {


    if (weather === "cloudy"){
        return (<p className="weather">
            <img className="weather-icon" src="/cloud.png" alt="weather"/>
        </p>)
    }

    if (weather === "sunny"){
        return (<p className="weather">
            <img className="weather-icon" src="/sun.png" alt="weather"/>
        </p>)
    }

}

export default Weather;