import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

function print(msg) {
  console.log(msg);
}

ReactDOM.render(  <App 
  name={"Sneha"} 
  age={3} 
  array={[1,2]} 
  obj={{name:"megha"}} 
  bol={true}
  print={print}
  />,
  document.getElementById('root')
);

