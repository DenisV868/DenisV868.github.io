const AlertBox = ({showAlert,closeAlert,removeUnchecked,removeChecked,rmAll}) => {
    if(!showAlert)return null

    return (<div className={"alert-box"}>
        <button className={"close-btn"} onClick={closeAlert}>X</button>
        <ul>
            <li onClick={removeChecked}>Checked</li>
            <li onClick={removeUnchecked}>Un Checked</li>
            <li onClick={rmAll}>Remove All</li>
        </ul>
        </div>);

}

export default AlertBox;
