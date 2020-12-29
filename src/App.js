
import './App.css';
import React, { Component } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid';  //used to create keys 
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

import Column from "./Column";


const Container = styled.div`
      display : flex;

`

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
    },


    {
      id : uuid(),
      columnName : "In-Progress",
      emoji : "💡",
      tasks : []
    },

    {
      id : uuid(),
      columnName : "Finished",
      emoji : "💡",
      tasks : []
    }
 ]






export default class App extends Component {


  constructor(props) {   
    super(props);    
    this.state = {columns: columnsFromBackend};  
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
    
     <div>     
       <p>Keyboard draggingg : https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/sensors/keyboard.md</p>
       <DragDropContext onDragEnd={this.onDragEnd}>
         
         <Droppable droppableId="all-columns" direction="horizontal" type="column">
        
          {(provided) =>( 
            <Container {...provided.droppableProps} ref={provided.innerRef}>          
              
              {
                
                this.state.columns.map( (col, index) =>{

                  return (<Column key={col.id} column={col} index={index}/>)

                })
              }
              
             {provided.placeholder}
            </Container>)}
           
             
                 
           
           </Droppable>
       
        </DragDropContext>
     </div>
 
    )
  }
}