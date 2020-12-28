
import React, { Component } from 'react'
import {Droppable} from 'react-beautiful-dnd'
import styled from "styled-components"
import Task from "./Task"


const Container = styled.div`

    margin : 8px;
    border : 1px solid lightgrey;
    border-radius : 2px;


`;

const Title = styled.h3`

    padding : 8px;

`;


const TaskList = styled.div`

    padding: 8px;

`;


export default class column extends Component {
    render() {
        return (
            <div>
                <Container>
                <Title>{this.props.column.columnName}</Title>
                    <Droppable droppableId={this.props.column.id}>



                              

                           
                         {provided =>(<TaskList   ref={provided.innerRef} {...provided.droppableProps}>

                                        {this.props.column.tasks.map((t, index) =>{

                                            return (<Task key={t.id}  task={t}  index={index}/>)


                                        })}
                                        {provided.placehoder}

                                        </TaskList>)}
                            
                       
                       

                     </Droppable>
                </Container>
            </div>
        )
    }
}

