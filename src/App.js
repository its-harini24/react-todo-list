
import './App.css';
import React from 'react';
import { useState ,useEffect} from 'react';


function App() { 

  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState(() =>{
    const savedTasks =localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks):[];
  

  });
  useEffect(() =>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
    
  },[tasks]);

  function addTask(){
    if (task.trim()===""){
      alert("Please Enter a Task!");
      return;
    }
      setTasks([...tasks,{
        text:task,
      completed:false
    }]);
      setTask("");
    

  }
function deleteTask(indexToDelete){
  console.log("Delete clicked:",indexToDelete);  
  setTasks(
      tasks.filter((item,index)=> index!==indexToDelete)
    );
  }
function editTask(index){
  const newTask = prompt("Edit Your Task:",tasks[index].text);
  if (newTask === null|| newTask.trim()===""){
    return;
  }
  const updatedTasks =[...tasks];
  updatedTasks[index].text=newTask;
  setTasks(updatedTasks)

}
function toggle(index){
const updatedTasks =[...tasks];
console.log("Before:",updatedTasks[index].completed);
updatedTasks[index].completed=!updatedTasks[index].completed;
console.log("After:",updatedTasks[index].completed);
setTasks(updatedTasks);
}
function clearAll(){
  const confirmDelete = window.confirm("Are you sure you want to delete all tasks?");
  if(confirmDelete){
  setTasks([]);
  }
}
  return (
  
    <div className='box'>

      <h1>My To-Do-List</h1>

      <input 
        type="text"
        placeholder="Enter a Task"
        value={task}
        onChange={(e)=>setTask(e.target.value)}
      />

      <button onClick={addTask} className='add'>
        Add
      </button>


      <ul>
        {
          tasks.map((item,index)=>(
            <li key={index}>
             <input type="checkbox"
             checked={item.completed}
             onChange={()=>toggle(index)} />
            <span className={item.completed?"completed":""}>
            {item.text}
            </span>
            <button onClick={()=>editTask(index)} className='edit'>
            Edit
            </button>
              <button onClick={() => deleteTask(index)} className='delete'>
            Delete
              </button>

            </li>

          ))
        }
      </ul>
 <button onClick={clearAll} className='clear'>Clear All</button>
    </div>
  );
  
}
export default App;


