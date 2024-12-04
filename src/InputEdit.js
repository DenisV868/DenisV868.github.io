import React from "react";

const InputEdit = ({textEdit, closeAlert,showAlert,val, InputRef}) => {

    if(!showAlert)return null;

    return(<div className={"input-edit"}>
        <button className={"close-btn2"} onClick={closeAlert}>X</button>
        <input type={"text"} value={val}/><button className={"edit"}>edit</button>
    </div>)

}

export default InputEdit