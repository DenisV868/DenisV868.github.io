import React from "react";

const Weather = ({weather}) => {


    const renderWeatherIcon = () => {
        switch (weather) {
            case "sunny":
                return <img src="/sun.png" alt="Sunny"/>;
            case "cloudy":
                return <img src="/cloud.png" alt="Cloudy"/>;
            case "rainy":
                return <img src="/icons/rainy.png" alt="Rainy"/>;
            case "windy":
                return <img src="/icons/windy.png" alt="Windy"/>;
            default:
                return <p>?</p>;
        }
    };

    return (
        <p className="weather">
            {renderWeatherIcon()}
        </p>
    );
}

export default Weather;