import { Project } from "./objects/projectObj.js";
import { TodoItem } from "./objects/todoObj.js";
import {ProjectHandler} from './objects/projectHandler.js'
import { storageAvailable } from "./localStorage.js";
import { PageInitializer } from "./DOMmanipulation/pageController.js";
import './styles/main.css';

// localStorage.clear()
const projectHandler = new ProjectHandler()
if(storageAvailable('localStorage')){
    let ls = JSON.parse(localStorage.getItem('projects'))
    console.log(ls)
    if(ls == null){
        const testTask1 = new TodoItem(
            'Laundry',
            'not-started',
            'low',
            '2024-04-17',
            'Do the laundry and seperate by lights and darks:\nsocks\npants\nshirts')
        
        const testTask2 = new TodoItem(
            'Dishes',
            'completed',
            'high',
            '2024-04-15',
            'dishes have piled up. do them quickly')
        
        const testProject = new Project(
            'Household Chores'
        )
        
        const testTask3 = new TodoItem(
            'Finish ToDo assignment',
            'in-progress',
            'medium',
            '2024-04-24',
            'Finish the Odin Project Todo Assignment so you can move on')
        
        testProject.addTask(testTask1)
        testProject.addTask(testTask2)
        
        projectHandler.addProject(testProject)
        
        const project2 = new Project('Odin Project')
        project2.addTask(testTask3)
        // projectHandler.addProject(project2)
    }
    else{
        for(let i=0; i<ls.length;i++){
            const newProject = new Project(ls[i].name)
            console.log(ls[i])
            for(const task of ls[i].tasks){
                const newTask = new TodoItem(
                    task.title, 
                    task.jobStatus, 
                    task.priority, 
                    task.dueDate, 
                    task.detail)
                newProject.addTask(newTask)
            }
            projectHandler.addProject(newProject)
            projectHandler.updateLocalStorage()
        }
    }
}


let Page = new PageInitializer(projectHandler)
Page.initialize(projectHandler)

export {Page}