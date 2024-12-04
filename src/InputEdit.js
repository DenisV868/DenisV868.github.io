import React, {useEffect, useState} from "react";

const InputEdit = ({closeAlert,showAlert,val, editF}) => {

    const [inputValue, setInputValue] = useState(val);

    // To make sure inputValue updates when val prop changes
    useEffect(() => {
        setInputValue(val);
    }, [val]);

    if (!showAlert) return null;

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Update inputValue state when the user types
    };


    return(<div className={"input-edit"}>
        <button className={"close-btn2"} onClick={closeAlert}>X</button>
        <input type={"text"} value={inputValue} onChange={handleInputChange}/><button className={"edit"} onClick={()=>editF(inputValue)}>edit</button>
    </div>)

}

export default InputEdit