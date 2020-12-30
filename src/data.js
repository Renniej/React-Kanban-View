import { v4 as uuid } from 'uuid';  //used to create keys 

export const itemsFromBackend = [

    {id : uuid(), title: "Workshop 1", content : 'First Task', date : Date.now()}, 
  
    {id : uuid(), title: "Workshop 2", content : 'Second Task', date : Date.now()},  
  
    {id : uuid(), title: "Workshop 3", content : 'Third Task', date : Date.now()}
  
  
  ]
  
  
 export const columnsFromBackend =    //mockup data/ placeholder for actual api 
  
   [
      {
        id : uuid(),
        columnName : "Todo",
        emoji : "💡",
        tasks : itemsFromBackend
      },
  
  
      {
        id : uuid(),
        columnName : "In-Progress",
        emoji : "💡",
        tasks : []
      },
  
      {
        id : uuid(),
        columnName : "Finished",
        emoji : "💡",
        tasks : []
      }
   ]
  