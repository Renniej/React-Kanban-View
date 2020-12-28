
import './App.css';
import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';  //used to create keys 
import {DragDropContext} from 'react-beautiful-dnd'

import Column from "./column";

const itemsFromBackend = [

  {id : uuid(), content : 'First Task', date : Date.now()}, 

  {id : uuid(), content : 'Second Task', date : Date.now()},  

  {id : uuid(), content : 'Third Task', date : Date.now()}


]


const columnsFromBackend =    //mockup data/ placeholder for actual api 

 [
    {
      id : uuid(),
      columnName : "Todo",
      emoji : "💡",
      tasks : itemsFromBackend
    }
   

 ]






export default class App extends Component {


  constructor(props) {   
    super(props);    
    this.state = {columns: columnsFromBackend};  
  }
      onDragEnd = result =>{
          const {destination, source, Draggable} = result;


          if (destination === null) 
           return;

          if (destination.droppableId === source.droppableId && destination.index === source.index)
           return;


         const column = this.state.columns.find((col)=>{ //find will always only return 1 element because it only looks for the first element that matches the parameters

            
                    return col.id === source.droppableId;
           })



         
          const task = column.tasks[source.index];
          
          
          const newTasks = Array.from(column.tasks);  //creates clone of task located in the column
          newTasks.splice(source.index, 1); //remove the item located at this index
          newTasks.splice(destination.index, 0, task); //inserts the task at the destination index (does not delete/remove anything a.k.a everything gets shifted for the added task)



          const newColumn = {...column, tasks : newTasks}


          const newState = this.state.columns.splice() //copys everything but overwrites anything that was stored in a specific column based on its index.


          newState[this.state.columns.findIndex((col)=>{return col.id === source.droppableId})] = newColumn 
    
       
          this.setState({columns : newState});

      }


  render() {
    return (
  
      <DragDropContext onDragEnd={this.onDragEnd} >
     

          {
          
       
            this.state.columns.map( (col) =>{

          
              return (<Column key={col.id} column={col}/>)

          })}
            
        
     
      </DragDropContext>
    )
  }
}