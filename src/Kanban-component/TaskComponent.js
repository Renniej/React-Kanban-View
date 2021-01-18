import React, { Component } from 'react'
import styled from "styled-components"
import {Draggable} from 'react-beautiful-dnd'
import {
     Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';


import '@szhsin/react-menu/dist/index.css';


import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Container = styled.div`


        border : 1px solid lightgrey;
        padding : 8px;
        border-radius : 2px;
       
        margin-bottom : 8px;
        background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')}

        
`;

const ButtonSpacing = styled.div`

margin-left: auto;
 

`

const RowContainer = styled.div`

    display : flex;
    flex-direction: row;

    align-items: center;
    .button{
        padding: 0;
border: none;
background: none;
    }
`


class TaskMenu extends Component {
   render(){
       return (
       
        
               <Menu  direction={'right'}   arrow={true} menuButton={<MenuButton styles={{border: 'none' ,background: 0} }><MoreHorizIcon/></MenuButton>}>
                   
                   <MenuItem> Add Subtask</MenuItem>
                   <MenuItem>Move to</MenuItem>
                   <MenuItem>Tags</MenuItem>
                   <MenuItem >Duplicate</MenuItem>
                   <MenuItem onClick={ () =>(this.props.deleteTask)}>Delete</MenuItem>
               </Menu>
          
       )
   }
}

export default class TaskComponent extends Component {
    

    constructor(props) {   
        super(props);    
        this.state = {task : this.props.task}
        
    }
    render() {

       

        return (

            <Draggable draggableId={this.state.task.id} index={this.props.index} >

                {(provided, snapshot) =>(
                
              
                <Container isDragging={snapshot.isDragging} onClick={() => (  this.setState({...this.state, showMenu: true}))    } {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    
                    
                <RowContainer> 
                    {this.state.task.title} 
                    
                     <ButtonSpacing>
                         <TaskMenu deleteTask={this.props.deleteTask}/>
                    </ButtonSpacing>
                </RowContainer>
                    
                {provided.placeholder} 
                    
                </Container>

                
        
          
                )
               
                
                }
                
            </Draggable>
        )
    }
}



