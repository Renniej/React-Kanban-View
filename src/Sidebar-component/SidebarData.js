import React from "react";
import { PlayForWorkOutlined } from '@material-ui/icons';

import * as FAIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import * as BsIcons from   'react-icons/bs'
import * as AiIcons from 'react-icons/ai'

import * as dataService from '../dataService'


export function getSidebarData(){


        var sidebarData = [];


    
        dataService.getAllProjectsWithGroups().forEach(group =>{ //get all projects and turn them into sidebar menu items , Also group up projects within the same group


                    var projectItems = [];
                    var totalLength = 0;

                    group.projects.forEach(proj =>{  //create subMenu containing all projects within group

                        projectItems.push({
                            title : proj.name,
                            path : `/projects/` + proj.id,
                            icon :  <BsIcons.BsList/>,
                            taskNum : dataService.getNumOfTasks(proj.id)
                        })

                        totalLength += projectItems[projectItems.length-1].taskNum;

                    })



                    if (group.id != `nonGrouped`){

                      

                       

                        sidebarData.push({
                            title : group.name,
                            path : `/groups/`  + group.id,
                            icon : <AiIcons.AiFillFolder/>,
                            iconClosed :<IoIcons.IoIosArrowUp/>,
                            iconOpened :  <IoIcons.IoIosArrowDown/>,
                            subNav : projectItems,
                            taskNum : totalLength
                        })


                }
                else{
                    sidebarData = sidebarData.concat(projectItems)    //Add project items to sidebarData (merges arrays)
                }
        })

          
        return sidebarData;

        

}