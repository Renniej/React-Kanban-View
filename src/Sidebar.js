import React, { Component } from 'react'
import {ProSidebar, SidebarHeader, SidebarFooter, SidebarContent,  Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import * as dataService from './dataService'
import styled from 'styled-components'
import 'react-pro-sidebar/dist/css/styles.css';
import userImg from './images/userRennie.png'

var userName = "Tai-Juan Rennie"
var userType = "Standard User"
var userStatus = "Online"



  const UserInfo = styled.div`
  overflow: hidden;

  >span {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
  }

  .user-role {
      font-size: 12px;
  }

  .user-status {
      font-size: 11px;
      margin-top: 4px;

      i {
          font-size: 8px;
          margin-right: 4px;
          color: #5cb85c;
      }
`

const UserPic = styled.div`
width: 60px;
            padding: 2px;
            margin-right: 15px;
            overflow: hidden;

            img {
                height: 100%;
                width: 100%;
            }

`


const Header = styled.div`
display : flex;
flex-direction : row;
padding: 20px;
overflow: hidden;

`

export default class Sidebar extends Component {

    constructor(props){
        super(props)


        this.state = {projectGroups :  dataService.getAllProjectsWithGroups()}
        console.log(this.state)

    }


   

    render() {
        return (
            <ProSidebar>

                 

                    
            <SidebarHeader>
                
                <Header>
                   
                                <UserPic>
                                    <img className="img-responsive img-rounded" src={userImg} alt="User " />
                                </UserPic>

                                <UserInfo>
                                    <span className="user-name">
                                        <strong> Rennie</strong>
                                    </span>
                                    <span className="user-role"> Standard User</span>
                                    <span className="user-status">
                                        <i className="fa fa-circle"></i>
                                        <span> Online</span>
                                    </span>
                                </UserInfo>

                  
                </Header>
                
            </SidebarHeader>


            <SidebarContent>  


           
                <Menu>
                    <MenuItem>Today</MenuItem>
                    <MenuItem>Next 7 Days</MenuItem>
                    <MenuItem>Calendar</MenuItem>
                    <MenuItem>Inbox</MenuItem>
                </Menu>

                {this.state.projectGroups.map(group =>{

                    
                    let cat = group.id !== "nonGrouped" ? (<React.Fragment>


                                
                
                        <SubMenu title={group.name} >
                            {
                                group.projects.map(project =>{
                                    return <MenuItem>{project.name + " - " + dataService.getNumOfTasks(project.id)}</MenuItem>
                                })
                            }
                        </SubMenu>
               




                    </React.Fragment>) :  (group.projects.map(project =>{
                                            return <MenuItem>{project.name + " - " + dataService.getNumOfTasks(project.id)}</MenuItem>
                                            }))




                        
                        return (<Menu>{cat}</Menu>);

                   
                      
                
                    
                 
                
                })}
           
              
            
               
       



                
            </SidebarContent>


           
      </ProSidebar>
        )
    }
}


