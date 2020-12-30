
import React, { Component } from 'react'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import styled from "styled-components"
import Task from './Task';
import TaskComponent from "./TaskComponent"

const Input = styled.input`


        border : 1px solid lightgrey;
        padding : 8px;
        border-radius : 2px;

       
        margin-left :5px;
        margin-right : 5px;

        margin-bottom : 8px;
        
`;

const Container = styled.div`

    margin : 8px;
    border : 1px solid lightgrey;
    border-radius : 2px;
    width  : 220px;

    background-color: white;
    display : flex;
    flex-direction :  column;

`;

const Title = styled.h3`

    padding : 8px;
    display: flex;

`;

const ItemCount = styled.div`
        color : lightgrey;
        margin-left : 10px
`;


const TaskList = styled.div`

    padding: 8px;
    transition : background-color 0.2s ease;
    background-color : ${props =>  (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow : 1;
    min-height  : 100px;



`;

class TextInput extends React.Component {
    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          
            this.props.addNewTask();
            e.target.value = null
      }
    }
  
    render() {
      return <Input id="newTaskInput" type="text" onChange={ (event) => (this.props.onChange(event.target.value))}  onKeyDown={this._handleKeyDown} placeholder="New Task"/>
    }
}


export default class column extends Component {


    constructor(props) {   
        super(props); 

        this.state = {title : null};  

        this.addNewTask = this.addNewTask.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
      }
    

      addNewTask = () =>{

        //TODO: Allow modifications of other task parameters such as date, description,etc
      
          this.props.addNewTask(new Task(this.state.title, "testing", Date.now(),null,null),this.props.column.id)
          this.setState({title: null});
      }

      onInputChange = (val) =>{
         
            this.setState({title : val})
      }


    render() {
        return (
           

          
                <Draggable draggableId={this.props.column.id} index={this.props.index}>

                    {provided =>( <Container {...provided.draggableProps} ref={provided.innerRef}>


        <Title {...provided.dragHandleProps}> {this.props.column.columnName} <ItemCount>{this.props.column.tasks.length}</ItemCount>  </Title>

            <TextInput addNewTask={this.addNewTask} onChange={this.onInputChange}/>


            <Droppable droppableId={this.props.column.id} type="task">



            

        
        {(provided, snapshot) =>(<TaskList  isDraggingOver={snapshot.isDraggingOver}  ref={provided.innerRef} {...provided.droppableProps}>
        
                        {this.props.column.tasks.map((t, index) =>{

                            return (<TaskComponent key={t.id}  task={t}  index={index}/>)


                        })}
                        
                            {provided.placeholder}
                        </TaskList> 
                        )}
            
    
    

    </Droppable>
    {provided.placeholder}
</Container>)}
               

                </Draggable>
              
          
        )
    }
}

