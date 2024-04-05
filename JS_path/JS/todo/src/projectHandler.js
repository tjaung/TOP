import { ErrorLog } from "./errorLogger";
const ErrorLogger = new ErrorLog()

export class ProjectHandler {
    constructor(){
        this.projectList = [];
    }

    addProject(projectObj) {
        const found = this.projectList.some(pro => pro.name === projectObj.name);
        if (!found) (this.projectList.push(projectObj));
        else {ErrorLogger.throwError('Project Already Exists')}
    }

    removeProject(projectName) {
        this.projectList = this.projectList.filter((pro) => 
            pro.name !== projectName
        );
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
            // might have to undo stringify
        return this.projectList[indexes];
    }

}