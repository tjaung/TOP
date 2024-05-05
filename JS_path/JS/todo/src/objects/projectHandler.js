import { ErrorLog } from "../errorLogger";
const ErrorLogger = new ErrorLog()

export class ProjectHandler {
    constructor(sidebar){
        this.projectList = [];
        this.sidebar = sidebar
    }

    addProject(projectObj) {
        const found = this.projectList.some(pro => pro.name === projectObj.name);
        if (!found) {
            this.projectList.push(projectObj)
            this.updateLocalStorage()
        }
        else {ErrorLogger.throwError('Project Already Exists')}
    }

    removeProject(projectName) {
        console.log(projectName)
        for(let i=0; i< this.projectList.length; i++){
            console.log(this.projectList[i].name)
            if(this.projectList[i].name == projectName) {
                this.projectList.splice(i, 1)
            }
        }
        this.updateLocalStorage()
    }

    returnAllProjectTitles() {
        const out = []
        for(const project of this.projectList) {
            out.push(project.name)
        }
        return out
    }

    returnAllProjects() {
        return this.projectList
    }

    returnSingleProject(projectName) {
        let indexes = [], i;
        for(i = 0; i < this.projectList.length; i++)
            if (this.projectList[i].name.toLowerCase().includes(projectName.toLowerCase()))
                indexes.push(i);
        return this.projectList[indexes];
    }

    updateLocalStorage() {
        localStorage.setItem('projects', JSON.stringify(this.returnAllProjects()))
    }

}