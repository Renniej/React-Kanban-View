import React, { Component } from 'react'
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

const DropdownLink = styled(Link)`
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
        this.state = {subnavOpen : false}
    }

    showSidebar = () => {this.setState({...this.state, subnavOpen : !this.state.subnavOpen})}

    render() {
        return (
          <>
           <SidebarLink to={this.props.item.path} onClick={this.props.item.subNav && this.showSidebar}>
               <div>
                   {this.props.item.icon}
                   <SidebarLabel>{this.props.item.title} - {this.props.item.taskNum}</SidebarLabel>
               </div>
               
               <div>
                    {this.props.item.subNav && this.state.subnavOpen
                  ? this.props.item.iconOpened
                  : this.props.item.subNav
                  ? this.props.item.iconClosed : null}
                 
               </div>
           </SidebarLink>

                    {this.state.subnavOpen && this.props.item.subNav.map((item,index)=>{

                      return (
                          <DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.title} - {item.taskNum}</SidebarLabel>
                          </DropdownLink>
                      )

                    })}
          </>
        )
    }
}
