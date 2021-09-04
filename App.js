import React from "react";
import JobApp from "./JobApp";
import JobApp2 from "./JobApp2";
import PostApp from "./PostApp";

function App(props) {
   // props.name ="Test"; ///props are only read
  //return (
  // <>
  // <p>Hello   {props.name}</p>
  
  // <AppClass name={"jay"} num={0}/>
  // </>
  //<PostApp/>
  //);
  return <p onClick={() => props.print("my message")}>Hello   {props.obj.name}</p>
}

export default App