
import React, { Component } from 'react'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import styled from "styled-components"
import Task from "./Task"


const Container = styled.div`

    margin : 8px;
    border : 1px solid lightgrey;
    border-radius : 2px;
    width  : 220px;


    display : flex;
    flex-direction :  column;

`;

const Title = styled.h3`

    padding : 8px;

`;


const TaskList = styled.div`

    padding: 8px;
    transition : background-color 0.2s ease;
    background-color : ${props =>  (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow : 1;
    min-height  : 100px;



`;


export default class column extends Component {
    render() {
        return (
           

          
                <Draggable draggableId={this.props.column.id} index={this.props.index}>

                    {provided =>( <Container {...provided.draggableProps} ref={provided.innerRef}>


        <Title {...provided.dragHandleProps}>{this.props.column.columnName}</Title>
            <Droppable droppableId={this.props.column.id} type="task">



            

        
        {(provided, snapshot) =>(<TaskList  isDraggingOver={snapshot.isDraggingOver}  ref={provided.innerRef} {...provided.droppableProps}>
        
                        {this.props.column.tasks.map((t, index) =>{

                            return (<Task key={t.id}  task={t}  index={index}/>)


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

