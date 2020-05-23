import React, { useRef, useState } from 'react';
 import {CopyToClipboard} from 'react-copy-to-clipboard';

function App() {
    
  const [random, setRandom] = useState(0);
    
  const [state, setState] = useState();    
    
class App extends React.Component {
    random = {
        value: 0,
        copied: false,
    }
}

    
const button = {
     cursor: "pointer",
     transition: "0.1s",
};


const original = {
    transition: "0.1s",
    backgroundColor: "rgba(255,255,0)",
    opacity: "0",
    position: "absolute",
    top: 0,
};

const whenClick = {
     transition: "0.1s",
     backgroundColor: "yellow"
};
    

 function generate() {
     var ar = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "q", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "!", "1", "2", "3", "4", "%", "5", "6", "7", "8", "9", "/", "&", ")", "("];
     var p = [];
     for (var i = 0; i < 15; i++) {
     var arr = Math.floor(((Math.random() * ar.length) - 1));
     p.push(ar[arr]);
     }
     setRandom({value: p.join(''), copied: false})
 }


function CopyEv() {
    setState(true);
   
    setTimeout(
        function() {
           setState(false); 
        }, 1000);
    console.log(state);
}
    
  return (
      <div>
       

      <h1 class="copy">{(state === true) ? "COPPIED" : ""}</h1>
      
      <div class="all" style={(state === true) ? original : whenClick}>

        <h1 class="up">PassGen</h1>
       
          
        <h1 class="title">CLICK GENERATE FOR A PASSWORD AND CLICK ON THE PASSWORD TO COPY IT</h1>
     
        <h1 class="btn" onClick={generate}>Generate</h1>
       
        <CopyToClipboard text={random.value}>

        <h1 class="password" onClick={CopyEv} onCopy={{random}} style={(state === true) ? button : button}>{random.value}</h1>
      
         </CopyToClipboard>
     
     </div>

    </div>
    
  );
}

export default App;
