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

    onDragEnd = result =>{
        
        const {destination, source, type} = result;

        if (destination === null) //If destination does not exist exit (User did not drop object in approp. space)
        return;

        //if desintation and source the same  AND indexs are the same then exit (User is trying to put object in original spot)
       if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;


        if (destination.droppableId != source.droppableId)
            this.onDragEnd_edge1(destination, source,type);
        else
            this.onDragEnd_base(destination, source,type);

    }

    //when an project is dragged outside of a sub-menu
    onDragEnd_edge1 = (destination, source,type) =>{

        const newData = [...this.state.data]
        const newProjectGroup = {...newData.find((item)=>{return source.droppableId === item.id})}
        const newSubNav = [...newProjectGroup.subNav]


        const project = {...newSubNav[source.index]}


        newSubNav.splice(source.index,1);
        newData.splice(destination.index,0,project);

        newProjectGroup.subNav = newSubNav
        
        newData[newData.findIndex(item =>{ return source.droppableId === item.id})] = newProjectGroup
      

        this.setState({...this.state, data : newData});

      
    }

    //when a project/project group is switching places on sidebar
    onDragEnd_base = (destination,source, type)=>{

        const newData = [...this.state.data]

        const item = newData[source.index]
     

        newData.splice(source.index,1); //removes dragged item from array
        newData.splice(destination.index,0,item); //adds dragged item to array at the spot it was dropped

        this.setState({...this.state, data: newData});

        
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}> 
                        <Nav>
                            <NavIcon to='#'>
                                <FaIcons.FaBars onClick={this.showSidebar}/>
                            </NavIcon>
                        </Nav>

                <Droppable droppableId="Sidebar" diirection="horzontal" >

                    {(provided,snapshot)=>( 
                        <>

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

                                {provided.placeholder}
                            </SidebarWrap>
                         
                        </SidebarNav>
                    </>)}
                   

                </Droppable>
          </DragDropContext>
        )
    }
}
