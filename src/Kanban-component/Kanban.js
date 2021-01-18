

import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid';  //used to create keys 
import {DragDropContext, Droppable} from 'react-beautiful-dnd'


import * as dataService from '../dataService'



import Column from "./Column";
import NewSectionBTN from './NewSectionBTN'


import toast from "toasted-notes";
import "toasted-notes/src/styles.css"; // optional styles

const Container = styled.div`
      display : flex;
      align-items : flex-start;
      background-color: white;
`





 

 

 class Kanban extends Component {

  


  constructor(props) {   
    super(props);    

    console.log(this.props.location.pathname)
    this.state = {proj_id :this.props.match.params.projId, project: dataService.getEmptyProject()};

    this.addNewColumn = this.addNewColumn.bind(this);
    this.addNewTask = this.addNewTask.bind(this);

    this.deleteTask = this.deleteTask.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.renameColumn = this.renameColumn.bind(this);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragEnd_Column = this.onDragEnd_Column.bind(this)
    this.onDragEnd_Task = this.onDragEnd_Task.bind(this)
  }


  componentDidMount(){
    this.setState({...this.state, proj_id :this.props.match.params.projId,  project: dataService.getFullProject(this.state.proj_id)})
  }




  
//TOD: add logic for error cases
  deleteTask(task_id,col_id){
    
  
    const newColumns = [...this.state.project.columns];

    const col = newColumns.find(col => {return col.id === col_id});

    const newTasks = Array.from(col.tasks);

    delete newTasks[ (newTasks.findIndex(task => { return task.id === task_id}) )   ] ;

    col.tasks = newTasks;

    this.setState({...this.state, project : {...this.state.project, columns : newColumns }})
    
  }



//TOD: add logic for error cases
  deleteColumn(col_id){

  
    const newColumns = [...this.state.project.columns];
    const index = newColumns.findIndex(col => {return col.id === col_id});
    newColumns.splice(index, 1);


    this.setState({...this.state, project: {...this.state.project , columns : newColumns }})
    
  }

  addNewTask(task, col_id){

    //TODO: Add error checking to adding tasks
    

    if (task.title){
      const newColumns = [...this.state.project.columns];

      const col = {...newColumns.find(col => {return col.id === col_id})};


    
      col.tasks.push(task);
      


      this.setState(prevState =>{
        return{
            ...prevState,
            project : {...prevState.project, columns : newColumns}
        }
   })
  }
  else{
    toast.notify("The task name can not be empty", {duration: 1500})
  }
    






  }



  
  renameColumn = (name, col_id) =>{



    if (dataService.renameColumn(col_id, name) ){
      const newColumns = [...this.state.project.columns];
      const index = newColumns.findIndex(col => {return col.id === col_id});
      
      if (!name)
            toast.notify("Column name can not be empty")
      else{
        newColumns[index].columnName = name;
          this.setState({...this.state, project : { ...this.state.project , columns:newColumns }});
      }
    }
    else{
      toast.notify("Server Side Error: Could not rename")
    }




}


  addNewColumn(name){  
    
    if (name){
      const newColumns = [...this.state.project.columns]


      newColumns.push(
        {
          id : uuid(),
          columnName : name,
          emoji : "💡",
          tasks : []
        }

      )


      this.setState({...this.state, project : { ...this.state.project , columns:newColumns }});
    }else{

      toast.notify("The section name can not be empty", {duration: 1500})
     
    }
  }




  onDragEnd_Column(source, destination){
    const newColumnOrder = Array.from(this.state.project.columns)
    const col = newColumnOrder[source.index];
    
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index,0,col)

    this.setState({...this.state, project : { ...this.state.project, columns: newColumnOrder}})
  }



  //@param start : 1st column
  //@param finish : 2nd column
  onDragEnd_Task(start, finish, source, destination){ //For god sakes, clean this function up later ()
   
    if (start === finish ){
      const task = start.tasks[source.index];
      
      
      const newTasks = Array.from(start.tasks);  //creates clone of task located in the column
      newTasks.splice(source.index, 1); //remove the item located at this index
      newTasks.splice(destination.index, 0, task); //inserts the task at the destination index (does not delete/remove anything a.k.a everything gets shifted for the added task)



      const newColumn = {...start, tasks : newTasks}

      const newState = {...this.state};

      newState.project.columns[this.state.project.columns.findIndex((col)=>{return col.id === source.droppableId})] = newColumn

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

      newState.project.columns[this.state.project.columns.findIndex((col)=>{return col.id === source.droppableId})] = newStartColumn;
      newState.project.columns[this.state.project.columns.findIndex((col)=>{return col.id === destination.droppableId})] = newFinishColumn;

      this.setState(newState)
      console.log("New State : " ,newState)

  }
  }


  //TODO: Make onDragEnd() code more consistent and readable 
      onDragEnd = result =>{
          const {destination, source, type} = result;

          
          if (destination === null) 
           return;

          if (destination.droppableId === source.droppableId && destination.index === source.index)
           return;


          const start = this.state.project.columns.find((col)=>{ //find will always only return 1 element because it only looks for the first element that matches the parameters
               return col.id === source.droppableId;
           })

           const finish = this.state.project.columns.find((col)=>{ //find will always only return 1 element because it only looks for the first element that matches the parameters
               return col.id === destination.droppableId;
           })



         
          if (type === 'column'){
              this.onDragEnd_Column(source,destination)
          }
           
          else {
            this.onDragEnd_Task(start,finish,source,destination)

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


export default withRouter(Kanban);