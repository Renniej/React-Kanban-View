import { v4 as uuid } from 'uuid';  //used to create keys 


export default class Task {


    constructor(title, desc, dateDue, tags, subtask) {

        this.id = uuid();
        this.title = title;
        this.desc = desc;
        this.dateDue = dateDue;
        this.tags = tags;
        this.subtask = subtask;
      }


}