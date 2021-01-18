import { v4 as uuid } from 'uuid';  //used to create keys 

 const backend_tasks = [

    {id : "itemUnique1", title: "Workshop 1", content : 'First Task', date : Date.now()}, 
  
    {id : "itemUnique2", title: "Workshop 2", content : 'Second Task', date : Date.now()},  
  
    {id : "itemUnique3", title: "Workshop 3", content : 'Third Task', date : Date.now()},

    {id : "itemUnique4", title: "Workshop 4", content : 'Fourth Task', date : Date.now()},

    {id : "itemUnique5", title: "Workshop 5", content : 'Fifth Task', date : Date.now()},

    {id : "itemUnique6", title: "Workshop 6", content : 'Eighth Task', date : Date.now()},
  
  
  ]
  
  
  const backend_columns =    //mockup data/ placeholder for actual api 
  
   [
      {
        id : "col1",
        columnName : "Todo",
        emoji : "💡",
        tasks : ["itemUnique1", "itemUnique3", "itemUnique2"]
      },
  
  
      {
        id : "col2",
        columnName : "In-Progress",
        emoji : "💡",
        tasks : []
      },
  
      {
        id : "col3",
        columnName : "Finished",
        emoji : "💡",
        tasks : []
      }
   ]



const backend_projects = [
  
  {
      id : "uniqueProject1",
      name : "BTS630",
      group : "uniqueGroup1",
      columns : ["col1", "col2", "col3"]
  },

  {
      id : "uniqueProject2",
      name : "BTP600",
      group : "uniqueGroup1",
      columns : ["col2"]
  },

  {
    id : "uniqueProject3",
    name : "BTN530",
    group : "uniqueGroup1",
    columns : ["col3"]
  },


  { id : "uniqueProjec4",
   name : "Atomic Habits",
    group : "uniqueGroup2",
    columns : []
  },

  { id : "uniqueProjec5",
  name : "Testing Solo List",
   group : "nonGrouped",
   columns : []
 }

]
  


const backend_projectGroups = [


  
    {
      id: "uniqueGroup1",
     name: "School"
    },

    {id : "uniqueGroup2",
     name : "Personal"},

     {
      id: "nonGrouped",
      name: "For projects that dont have groups"
    }

  
]


export function getProjectGroup(group_id){

  var group = {...backend_projectGroups.find(group => {return group.id === group_id})}
  return group;

}


export function renameColumn(col_id, name){


  var column = {...backend_columns.find(col => {return col.id === col_id})}
  column.name = name;

  return true;


}

export function getProject(proj_id){

  
     
      return  {...backend_projects.find(proj => {return proj.id == proj_id})}
}


export function getColumn(col_id){
    return backend_columns.find(col => {return col.id === col_id});

}


export function getTasks(task_id){
  var task = {...backend_tasks.find(task => {return task.id === task_id })}
  return task;
}



export function getFullProject(proj_id){

      var project = getProject(proj_id);
      
     
      if (project === undefined)
        return;


      project.columns.map( (col_id, c_index) =>{

        var column =  getColumn(col_id);

        if (column.tasks.length > 0){
          column.tasks.map( (task_id, t_index)=>{

            column.tasks[t_index] = getTasks(task_id);

          })
      }

      project.columns[c_index] = column;
        

      
})


    


return project;
 


  
}



export function getEmptyProject(){


  return {
      id : "empty",
      name : "test",
      group : null,
      columns : []

  }
}


export function getAllProjects(){
        return backend_projects;
}


export function getAllProjectsWithGroups(){

    var projectGroup = [];


    backend_projectGroups.forEach(group => projectGroup.push({...group}))

    projectGroup.forEach(group => {

        group.projects = backend_projects.filter(project => project.group === group.id)

    })

  


    return projectGroup;

}


export function getNumOfTasks(proj_id){

  var tasks = 0;
  var project = {...backend_projects.find(proj => {return proj.id === proj_id})}


    project.columns.forEach(col_id =>{

        var col = getColumn(col_id);
       
        tasks += col.tasks.length;
       
    })

    return tasks


}