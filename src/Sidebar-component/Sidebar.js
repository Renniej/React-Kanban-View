import React, { Component } from "react"
import {DragDropContext, Droppable} from 'react-beautiful-dnd'


import {Link} from 'react-router-dom'
import styled from 'styled-components'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import * as BsIcons from   'react-icons/bs'
import * as AiIcons from 'react-icons/ai'

import * as SidebarData from   "./SidebarData"
import SubMenu from "./SubMenu"
import MenuItem from "./MenuItem"

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
    width : 100%;
`

export default class Sidebar extends Component {

    constructor(props){
        super(props)
        this.state = {data : [], sidebar : false}
    }

    componentDidMount(){
        this.setState({...this.setState, data : SidebarData.getSidebarData()})
    }

    showSidebar = () => {this.setState({...this.state, sidebar : !this.state.sidebar})}


    render() {
        return (
            <DragDropContext>
                <Droppable droppableId="Sidebar" diirection="horzontal" type="Sidebar">

                    {(provided,snapshot)=>( 
                        <>
                        <Nav>
                            <NavIcon to='#'>
                                <FaIcons.FaBars onClick={this.showSidebar}/>
                            </NavIcon>
                        </Nav>

                        <SidebarNav sidebar={this.state.sidebar} >

                            <SidebarWrap ref={provided.innerRef} {...provided.droppableProps}>
                                <NavIcon to='#'>
                                    <AiIcons.AiOutlineClose onClick={this.showSidebar}/>
                                </NavIcon>


                                {this.state.data.map((item,index)=>{

                                    if (item.subNav){  //If the item set is a group of objects a.k.a has a subNav then create a seperate sub menu for it (SubMenu is also a droppable)

                                          return (
                                        
                                            <SubMenu item={item} key={item.id} index={index}/>
                                            
                                          )
                                          
                                    }
                                        return <MenuItem item={item} key={item.id} index={index}/>
                                })}


                            </SidebarWrap>
                         
                        </SidebarNav>
                    </>)}
                   

                </Droppable>
          </DragDropContext>
        )
    }
}
