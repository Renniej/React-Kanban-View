import React, { Component } from 'react'
import styled from "styled-components"
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`


        border : 1px solid lightgrey;
        padding : 8px;
        border-radius : 2px;
       
        margin-bottom : 8px;
        background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}
`;




export default class TaskComponent extends Component {
    render() {
        return (

            <Draggable draggableId={this.props.task.id} index={this.props.index}>

                {(provided, snapshot) =>(
                
                
                <Container isDragging={snapshot.isDragging} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    
                    
                    {this.props.task.title} {provided.placeholder}
                    
                    
                    </Container>
                )
                
                
                }
                
            </Draggable>
        )
    }
}


