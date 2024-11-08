import React from "react";
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

function Numbers(props) {

    const list = props.numbers.map((number)=><li>{number}</li>);
    return <ul style={{display:"inline-block"}}>{list}</ul>
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
};

