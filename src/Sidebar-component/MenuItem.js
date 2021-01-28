import React, { Component } from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;


const DropdownWrap = styled.div`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;



export default class SubMenu extends Component {

    constructor(props){
        super(props)
        this.state = {subnavOpen : false, isSubItem : this.props.isSubItem }
    }

    showSidebar = () => {this.setState({...this.state, subnavOpen : !this.state.subnavOpen})}

     test = (<div></div>)
    getMenuItem = (provided) =>{

        var item = (<div>
                    {this.props.item.icon}
                    <SidebarLabel>{this.props.item.title} - {this.props.item.taskNum}</SidebarLabel>
                    </div>);


        return this.state.isSubItem ? (<DropdownWrap {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}><SidebarLink to={this.props.item.path}>{item}</SidebarLink></DropdownWrap>) :  
        
        ( <SidebarLink to={this.props.item.path} onClick={this.props.item.subNav && this.showSidebar}  {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
            {item}
          </SidebarLink>)
        
        
        
        
       
    }

    


      
    render() {
        return (


          <Draggable draggableId={this.props.item.id} index={this.props.index}>

            {(provided,snapshot) => (   
              
              this.getMenuItem(provided)

            )}
           
          </Draggable>
        )
    }
}
