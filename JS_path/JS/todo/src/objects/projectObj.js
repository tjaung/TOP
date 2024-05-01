export class Project {
    // tasks = [];
    constructor(name){
        this.name = name
        this.tasks = []
    }

    addTask(newTaskJSON){
        if(this.tasks.filter(task => newTaskJSON.title !== task)){this.tasks.push(newTaskJSON)}
    }

    removeTask(TaskTitle){
        this.tasks = this.tasks.filter((task) => 
            task.title !== TaskTitle
        );
    }

    filterTasks(search) {
        let indexes = [], i;
        for(i = 0; i < this.tasks.length; i++)
            if (this.tasks[i].title.toLowerCase().includes(search.toLowerCase()))
                indexes.push(i);
        return this.tasks[indexes];
    }

    returnAllTasks() {
        return this.tasks
    };

    returnAllTaskTitles(){
        let out = []
        for(let task of this.tasks){
            out.push(task.returnTitle())
        }
        console.log(out)
        return out
    }

    returnProjectName() {
        return this.name
    }

    returnProjectNameWithNoWhitespace(){
        return this.name.replace(/\s+/g, '-')
    }

    returnProjectJSON() {
        let tasksJSON = []
        for(const task of this.tasks){
            tasksJSON.push(task.returnItemJSON())
        }
        return {'name': this.returnProjectName(),
        'tasks': tasksJSON}
    }

    updateProjectName(newName) {
        this.name = newName
    }


}