import React from "react";


const InputEdit = ({textEdit, closeAlert}) => {

    const InputRef = React.createRef();

    return(<div>
        <button className={"close-btn"} onClick={closeAlert}>X</button>
        <input type={"text"} placeholder={textEdit} ref={InputRef}/><button>edit</button>
    </div>)

}

export default InputEdit