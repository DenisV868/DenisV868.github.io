import React from "react";
import {useState} from "react";
/*function tech(props) {

 return(
     <div style={{display: 'inline'}}>
     <img src={props.html} alt=""/>
     <img src={props.css} alt=""/>
     <img src={props.js} alt=""/>
     <img src={props.react} alt=""/>
 </div>)

}*/

//export default tech;
/*
function sub() {

    return(<div style={{textAlign:"center",background: "rgba(173, 216, 230, 0.5)"}}>
        <h1>Subscribe</h1>
        <p>Sign up with your email address to receive news and updates</p>
        <div style={{display: "inline-block"}}>
            <input type="text" placeholder="First name" style={{margin:"10px", borderRadius:"4px",border:"none"}}/>
            <input type="text" placeholder="Last name" style={{margin:"10px", borderRadius:"4px",border:"none"}}/>
            <input type="text" placeholder="E-mail" style={{margin:"10px", borderRadius:"4px",border:"none"}}/>
        </div>
        <div style={{alignContent: "center"}}>
            <button style={{margin:"10px", background:"red", color:"white", border: "1px solid red", borderRadius:"4px", width:"200px",height:"30px"}}>Subscribe</button>
        </div>
    </div>)*/

/*}

export default sub;*/

/*const getColor = (num) => {
    if(checkPrime(num)){return "red"}
    if(num%2===0){return "yellow"}
    else{return "green"}

}

function Numbers(props) {

    return props.numbers.map((number)=>(<td style={{background:getColor(number)}}>{number}</td>))

}

export default Numbers;

const checkPrime = (n) => {
    if (n <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};*/

const List = ({inputRef,dateInputRef}) => {

    const [element, setElement] = useState([]);
    let input = inputRef
    let dateInput = dateInputRef;
    function add() {
        if(inputRef.current) {
            input.current.focus();
        }

        let inputValue = inputRef.current?.value.trim();

        if (dateInputRef.current){
            dateInput.current.focus()
        }

        let dateInputValue = dateInputRef.current?.value.trim();

        let combined = inputValue + " " +dateInputValue;

        if (inputValue !== "" && dateInputValue !== "") {
            // append in react
            setElement(prevState => [...prevState, combined])
        }

        if(input.current) {
            input.current.value = "";
        }

        if(dateInput.current){
            dateInput.current.value = "";
        }

    }

    function remove() {
        if(inputRef.current && element.length > 0) {
            // the pop method
            setElement(element.slice(0, element.length - 1))

        }else{
            alert("There are no elements in the list")
        }
    }

    return (<div className={"containerForList"}>

        <button onClick={add}>add</button>
        <button onClick={remove}>remove</button>
        <ul>The list
            {element.map((item,index) => <li key={index}>{item}</li>)}
        </ul>

    </div>)

}

export default List
