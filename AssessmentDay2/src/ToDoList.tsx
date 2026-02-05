import React from 'react'
import { useState } from 'react';

export type PriorityType="Low"|"Medium"|"High" ;

export type FilterType="All"|"Completed"|"Pending";

export interface List{

    id:number;
    name:string;
    completed:boolean;
    priority:PriorityType

}

const ToDoList = () => {

 const listOfTodos:List[] =[
    {
    id:0,
    name:"Aaa",
    completed:false,
    priority:"Low" as PriorityType
    },

]
const[n,setn]=useState<number>(1)
const[todolist,settodolist]= useState<List[]>(listOfTodos);

const[newName,SetnewName]= useState<string>("");

const[editNameDic,SeteditNameDic]= useState<{[key:number]:string}>({});


const[newpriority,Setnewpriority]= useState<PriorityType>("Low");

const[filter, setfilter] = useState<FilterType>("All");

const filteredTodos= todolist.filter( (item)=>
{
    if(filter==="All") return true;
    if(filter=="Completed") return item.completed;
    if(filter=="Pending") return !item.completed;
    return true;
})

const removeTodo=(id:number)=>{
    settodolist(todolist.filter((item)=>item.id !==id));
}

const checkboxFunciton=(id:number)=>{
    const updatedList=todolist.map((item)=>item.id===id?{...item,completed:!item.completed} : item);
    settodolist(updatedList);
}

const EditName=(id:number)=>
{
    const updatedNameList= todolist.map((item)=>item.id===id?{...item,name:editNameDic[item.id]??item.name}:item);
    settodolist(updatedNameList);
    SeteditNameDic((pre)=>({...pre,[id]:""}));
}


const handleAddTodo=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    settodolist((preState)=>[...preState,{id:n,name:newName,completed:false,priority:newpriority}]);
    SetnewName("");
    Setnewpriority("Low");
    setn(n+1);
}

  return (
   <>
   <h2 style={{textAlign:"left"}}>Todo List</h2>
   
      <form onSubmit={handleAddTodo} style={{ display: "flex", gap: 8 }}>

        <input
          value={newName}
          onChange={(e) => SetnewName(e.target.value)}
        />
        <select
          value={newpriority}
          onChange={(e) => Setnewpriority(e.target.value as PriorityType)}
        >
       
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>

        </select>
        <button type="submit">Add</button>
      </form>
      
<div style={{textAlign:"left"}}>
   <h3>Total no of todos :{todolist.length}</h3>
   <h3>Completed  todos : {todolist.filter(x=>x.completed).length}</h3>
   <h3>Pending todos  : {todolist.filter(x=>!x.completed).length}</h3>
</div>


   {
    todolist.map((item)=>(

<div key={item.id} style={{
    display: "flex",
    alignItems: "center",   // vertically center everything
    gap: "2px",            // space between items
    padding: "2px",
    marginBottom: "2px",
    border: "0.05px solid #ccc",
    borderRadius: "0.5px",

}}>


<h1><input type="checkbox" checked={item.completed} onChange={()=>checkboxFunciton(item.id)} style={{ width: "40px", height: "40px" }}
 /></h1>
<h2>{item.name}</h2>
&nbsp;
&nbsp;
&nbsp;
<h3>Priority:{item.priority}</h3>
<br/>

 &nbsp;&nbsp;
<h3>{item.completed?"  Status :Completed":"  Status : Pending"}</h3>
&nbsp;&nbsp;&nbsp;&nbsp;
<button onClick={()=>removeTodo(item.id)}>Remove</button>
&nbsp;&nbsp;&nbsp;&nbsp;
<input type="text" placeholder={item.name} value={editNameDic[item.id]??item.name} onChange={(e)=>SeteditNameDic((pre)=>({...pre ,[item.id]:e.target.value}))} />
<button onClick={()=>EditName(item.id)}>EditName</button>

</div>


    ))
   }
   
<div>

    <button onClick={()=>setfilter("All")}  disabled={filter==="All"}>All</button>
    <button onClick={()=>setfilter("Completed")} disabled={filter==="Completed"}>Completed</button>
    <button onClick={()=>setfilter("Pending")} disabled={filter==="Pending"}>Pending</button>


    <ul style={{ textAlign: "left", marginLeft: 0, paddingLeft: "20px" }}>
    {filteredTodos.map((item)=>
    (
<li key={item.id}>{item.name} - {item.priority} - {item.completed?"Completed":"Pending"}</li>

    ))}
    </ul>
</div>

   </>
  )
}

export default ToDoList

