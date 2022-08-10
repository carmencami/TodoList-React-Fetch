import React, { useEffect,useState } from "react";
//include images into your bundle

//create your first component
const Home = () => {
    const [inputValue, setInputValue]=useState("");
    const [tasks, setTasks]=useState([]);
    useEffect(()=>{
        getTasks()
    },[])
        const getTasks= ()=>{
            fetch('https://assets.breatheco.de/apis/fake/todos/user/carmencami', {
            method: "GET",
            headers: {
              "Content-Type": "application/json"}
            })
          .then(resp => {
              console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
              console.log(resp.status); // el código de estado = 200 o código = 400 etc.
              return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
          })
          .then(data => {
            setTasks(data)
            setRender(true)
              console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
          })
          .catch(error => {
              //manejo de errores
              console.log(error);
          });
        }
useEffect(()=>{
    newTask()
        },[tasks])
    const newTask = () => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/carmencami', {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"},
              body: JSON.stringify(tasks)
            })
    }
    const handlerInput = (e)=> {
        setInputValue(e.target.value)
    }
    const handlePress = (e) => {
        // if (e.keyCode == 13){
        if (e.key == "Enter"){
            setTasks([...tasks, {label:inputValue, done:false}]);
            setInputValue("");
        }
    }
    const resetButton= (index) => {
        let temp=tasks;
        setTasks(()=>tasks.filter((Valiu,task)=>task!==index));
    }
    const html =tasks.map((task, i)=>{
        return <li className="list-group-item"    key={i}>{task.label}
        <button className="btn btn-white"  onClick={()=>resetButton(i)}value={tasks}>X</button>
        </li>
    })
    return (
        <div className="text-center container " >
            <h1>ToDos</h1>
            <input className="todo-input" type="text" onChange={handlerInput} onKeyDown={(e)=>handlePress(e)} value={inputValue}/>
            {/* <button className="btn button-text" onClick={handleButton}></button> */}
            <ul>
                {html}
            </ul>
        </div>
    );
};
//create your first component
export default Home;
