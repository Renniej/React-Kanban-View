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
      columns : []
  },

  {
    id : "uniqueProject3",
    name : "BTN530",
    group : "uniqueGroup1",
    columns : []
  },


  { id : "uniqueProjec4",
   name : "Atomic Habits",
    group : "uniqueGroup2",
    columns : []
  }
    

]
  


const backend_projectGroups = [

    {
      id: "uniqueGroup1",
     name: "School"
    },

    {id : "uniqueGroup2",
     name : "Personal"}
  
]


export function getProjectGroup(group_id){

  var group = {...backend_projectGroups.find(group => {return group.id === group_id})}
  
  return group;

}


export function getProject(proj_id){

      var project = {...backend_projects.find(proj => {return proj.id == proj_id})};

      return project;

}


export function getColumn(col_id){

    var column = {...backend_projectGroups.find(col => {return col.id === col_id})}
    return column;

}


export function getTasks(task_id){
  var task = {...backend_tasks.find(task => {return task.id === task_id })}
  return task;
}



export function getFullProject(proj_id){

      var project = getProject(proj_id);
   


      if (project === undefined)
        return;


      project.columns.map(col_id, c_index =>{

        project.columns[c_index] = getColumn(col_id);

        project.columns[c_index].tasks.map(task_id, t_index=>{

            project.columns[c_index].tasks[t_index] = getTasks(task_id);

        })


        return project;

})


    


       


  
}