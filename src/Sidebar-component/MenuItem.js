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




export default class SubMenu extends Component {

    constructor(props){
        super(props)
        this.state = {subnavOpen : false}
    }

    showSidebar = () => {this.setState({...this.state, subnavOpen : !this.state.subnavOpen})}

    render() {
        return (


          <Draggable draggableId={this.props.item.id} index={this.props.index}>

            {(provided,snapshot) => (    
              <>
                <SidebarLink to={this.props.item.path} onClick={this.props.item.subNav && this.showSidebar}  {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <div>
                        {this.props.item.icon}
                        <SidebarLabel>{this.props.item.title} - {this.props.item.taskNum}</SidebarLabel>
                    </div>
        
                </SidebarLink>

                    
              </>
            )}
           
          </Draggable>
        )
    }
}
