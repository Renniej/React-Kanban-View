
import React, { Component } from 'react'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import styled from "styled-components"
import Task from './Task';
import TaskComponent from "./TaskComponent"

import "toasted-notes/src/styles.css"; // optional styles

import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';


import '@szhsin/react-menu/dist/index.css';


import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';


import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';


const TitleRowContainer = styled.div`

display : flex;
flex-direction: row;

align-items: center;
 
`

const ColMenuContainer = styled.div`
    margin-left: auto;

    
`

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
    padding : 6px;
    border : 1px solid lightgrey;
    border-radius : 2px;
    width  : 220px;

    background-color: white;
    display : flex;
    flex-direction :  column;

`;

const Title = styled.h3`

    padding : 8px;

    display : flex;
    

`;

const ItemCount = styled.div`
        color : lightgrey;
        padding-left : 10px;
`;


const TaskList = styled.div`

    padding: 8px;
    transition : background-color 0.2s ease;
    background-color : ${props =>  (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow : 1;
    min-height  : 100px;



`;








class TaskTextInput extends React.Component {
    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          
            this.props.onEnter(e.target.value);
            e.target.value = null
      }
    }
  
    render() {
      return <Input id="newTaskInput" type="text" onChange={ (event) => (this.props.onChange(event.target.value))}  onKeyDown={this._handleKeyDown} placeholder="New Task"/>
    }
}


class ColumnTextInput extends React.Component {
    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          
            this.props.onEnter(e.target.value);
            e.target.value = null
      }
    }
  
    render() {
      return <Input id="newTaskInput" type="text" onKeyDown={this._handleKeyDown} defaultValue={this.props.colName}/>
    }
}


export default class column extends Component {


    constructor(props) {   
        super(props); 

        this.state = {colNameChange: false, colName : null, taskName : null};  

        this.addNewTask = this.addNewTask.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.renameColumn = this.renameColumn.bind(this);
        this.deleteTask =this.deleteTask.bind(this);

      }


      deleteTask = (task_id) =>{
          this.props.deleteTask(task_id, this.props.column.id);
      }  


      deleteColumn = () =>{
          console.log("column called")
           
            this.props.deleteColumn(this.props.column.id)
            
      }
    
      renameColumn = (name) =>{
        this.props.renameColumn(name, this.props.column.id);
        this.setState({...this.state, colNameChange: false})
      }
    


      addNewTask = (name) =>{ //use for task component

        //TODO: Allow modifications of other task parameters such as date, description,etc
      
          this.props.addNewTask(new Task(name, "testing", Date.now(),null,null),this.props.column.id)
          this.setState({...this.state, taskName: null});
      }

      onInputChange = (val) =>{ //Used for task component
         
            this.setState({...this.state, taskName : val})
      }


    render() {
        return (
           

          
                <Draggable draggableId={this.props.column.id} index={this.props.index}>

                    {provided =>( <Container {...provided.draggableProps} ref={provided.innerRef}>


                <TitleRowContainer {...provided.dragHandleProps}>
        
        
                    { this.state.colNameChange ? <ColumnTextInput onEnter={this.renameColumn} onChange={this.onInputChange} colName={this.props.column.columnName}/> :  <Title > {this.props.column.columnName} <ItemCount>{this.props.column.tasks.length}</ItemCount> </Title>}
                   
                    <ColMenuContainer>
                        <Menu  direction={'right'}   arrow={true} menuButton={<MenuButton styles={{border: 'none'}}><MenuIcon/></MenuButton>}>
                        
                            <MenuItem onClick={() => (this.setState({...this.state, colNameChange : true}))}><EditIcon/> Rename</MenuItem>
                            <MenuItem><FormatIndentDecreaseIcon/>Add Column to the left</MenuItem>
                            <MenuItem> <FormatIndentIncreaseIcon/>Add Column to the right</MenuItem>
                            <MenuItem onClick={this.deleteColumn}> <DeleteIcon/>Delete</MenuItem>
                            
                        </Menu> 
                    </ColMenuContainer> 
                  

                   </TitleRowContainer>


            <TaskTextInput onEnter={this.addNewTask} onChange={this.onInputChange}/>


            <Droppable droppableId={this.props.column.id} type="task">



            

        
        {(provided, snapshot) =>(<TaskList  isDraggingOver={snapshot.isDraggingOver}  ref={provided.innerRef} {...provided.droppableProps}>
        
                        {this.props.column.tasks.map((t, index) =>{

                            return (<TaskComponent key={t.id}  task={t}  index={index}  deleteTask={this.deleteTask}/>)


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

