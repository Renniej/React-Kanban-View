
import './App.css';
import React, { Component } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid';  //used to create keys 
import {DragDropContext, Droppable} from 'react-beautiful-dnd'


import * as dataService from './dataService'



import Column from "./Column";
import NewSectionBTN from './NewSectionBTN'


import toast from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles

const Container = styled.div`
      display : flex;
      align-items : flex-start;
      background-color: white;
`





 

 

export default class App extends Component {

  


  constructor(props) {   
    super(props);    

 
    this.state = {project: dataService.getFullProject("uniqueProject1")};

    this.addNewColumn = this.addNewColumn.bind(this);
    this.addNewTask = this.addNewTask.bind(this);

    this.deleteTask = this.deleteTask.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.renameColumn = this.renameColumn.bind(this);

    this.onDragEnd = this.onDragEnd.bind(this);

   
  }

//TOD: add logic for error cases
  deleteTask(task_id,col_id){
    /*
    console.log("TEST")
    const newColumns = [...this.state.columns];

    const col = newColumns.find(col => {return col.id === col_id});

    const newTasks = Array.from(col.tasks);

    delete newTasks[ (newTasks.findIndex(task => { return task.id === task_id}) )   ] ;

    col.tasks = newTasks;

    this.setState({...this.state, columns : newColumns })
    */
  }

//TOD: add logic for error cases
  deleteColumn(col_id){

  /*
    const newColumns = [...this.state.columns];
    const index = newColumns.findIndex(col => {return col.id === col_id});
    newColumns.splice(index, 1);


    this.setState({...this.state, columns : newColumns })
    */
  }

  addNewTask(task, col_id){

    //TODO: Add error checking to adding tasks
    

    if (task.title){
      const newColumns = [...this.state.columns];

      const col = newColumns.find(col => {return col.id === col_id});


      console.log("Task",task)
      col.tasks.push(task);
      console.log("TASKS",col.tasks)


      this.setState(prevState =>{
        return{
            ...prevState,
            columns : newColumns
        }
   })
  }
  else{
    toast.notify("The task name can not be empty", {duration: 1500})
  }
    






  }



  
  renameColumn = (name, col_id) =>{

    const newColumns = [...this.state];
    const index = newColumns.findIndex(col => {return col.id === col_id});
    
    if (!name)
          toast.notify("Column name can not be empty")
    else{
      newColumns[index].columnName = name;


        this.setState({...this.state, columns : newColumns});
    }
}


  addNewColumn(name){
    
   
    
    
    if (name){
      const newColumns = [...this.state.columns]


      newColumns.push(
        {
          id : uuid(),
          columnName : name,
          emoji : "💡",
          tasks : []
        }

      )


      this.setState({...this.state, columns:newColumns });
    }else{

      toast.notify("The section name can not be empty", {duration: 1500})
     
    }
  }


  //TODO: Make onDragEnd() code more consistent and readable 
      onDragEnd = result =>{
          const {destination, source, type} = result;

          
          if (destination === null) 
           return;

          if (destination.droppableId === source.droppableId && destination.index === source.index)
           return;


            const start = this.state.columns.find((col)=>{ //find will always only return 1 element because it only looks for the first element that matches the parameters
               return col.id === source.droppableId;
           })

           const finish = this.state.columns.find((col)=>{ //find will always only return 1 element because it only looks for the first element that matches the parameters
               return col.id === destination.droppableId;
           })



         
           if (type === 'column'){
                const newColumnOrder = Array.from(this.state.columns)
                const col = newColumnOrder[source.index];
                
                newColumnOrder.splice(source.index, 1);
                newColumnOrder.splice(destination.index,0,col)

                this.setState({...this.state, columns: newColumnOrder})
           }
           
           else{

            if (start === finish ){
              const task = start.tasks[source.index];
              
              
              const newTasks = Array.from(start.tasks);  //creates clone of task located in the column
              newTasks.splice(source.index, 1); //remove the item located at this index
              newTasks.splice(destination.index, 0, task); //inserts the task at the destination index (does not delete/remove anything a.k.a everything gets shifted for the added task)



              const newColumn = {...start, tasks : newTasks}

              const newState = {...this.state};

              newState.columns[this.state.columns.findIndex((col)=>{return col.id === source.droppableId})] = newColumn

              this.setState(newState);
              console.log("New State : " ,newState)
            }
            else{
              const task = start.tasks[source.index];
              const newStartTasks = Array.from(start.tasks);  
              const newFinishTasks = Array.from(finish.tasks);  

              newStartTasks.splice(source.index,1);
              newFinishTasks.splice(destination.index,0,task);

              const newStartColumn = {...start, tasks: newStartTasks }
              const newFinishColumn = {...finish, tasks: newFinishTasks }
              const newState = {...this.state};

              newState.columns[this.state.columns.findIndex((col)=>{return col.id === source.droppableId})] = newStartColumn;
              newState.columns[this.state.columns.findIndex((col)=>{return col.id === destination.droppableId})] = newFinishColumn;

              this.setState(newState)
              console.log("New State : " ,newState)
        
          }

        }

        
      }


  render() {

    return (
      
      <Container>     
      
       <DragDropContext onDragEnd={this.onDragEnd}>
         
         <Droppable droppableId="all-columns" direction="horizontal" type="column">
        
          {(provided) =>( 
            <Container {...provided.droppableProps} ref={provided.innerRef}>          
              
              {
                
                this.state.project.columns.map( (col, index) =>{

                  return (<Column deleteColumn={this.deleteColumn}  renameColumn={this.renameColumn} deleteTask={this.deleteTask} key={col.id} column={col} index={index} addNewTask={this.addNewTask}/>)

                })
              }
              
               

             {provided.placeholder}
            </Container>)}
           
             
                 
           
           </Droppable>

          
           
        </DragDropContext>

        <NewSectionBTN addNewColumn={this.addNewColumn}/>
        </Container>
       
     
 
    )
  }
}