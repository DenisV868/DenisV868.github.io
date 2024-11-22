import {useState} from "react";


const AlertBox = () => {

    const [alert,showAlert] = useState(true)

    const closeAlert = () => {

        showAlert(false)

    }

    if(!alert)return null

    return (<div className={"alert-box"}>
        <button className={"close-btn"} onClick={closeAlert}>X</button>
        <ul>
            <li>Checked</li>
            <li>Un Checked</li>
        </ul>
        </div>);

}

export default AlertBox;
