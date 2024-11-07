import React from "react";
/*import htmlLogo from './html_logo.png';
import cssLogo from './css_logo.png';
import jsLogo from './js_logo.png';
import reactLogo from './react_logo.png';

/*const techs = {
    "html":htmlLogo,
    "css":cssLogo,
    "js":jsLogo,
    "react":reactLogo
}

function tech() {

 return(
     <div style={{display: 'inline'}}>
     <img src={techs.html} alt=""/>
     <img src={techs.css} alt=""/>
     <img src={techs.js} alt=""/>
     <img src={techs.react} alt=""/>
 </div>)

}

export default tech;*/

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
    </div>)

}

export default sub;