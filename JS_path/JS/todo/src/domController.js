import {createNewTaskForm} from './createNewTask.js'
import { Project } from "./projectObj";
import { TodoItem } from "./todoObj";
import {ProjectHandler} from './projectHandler.js'
import { createDomElement } from "./componentMakers.js";
import * as ProjectDisplay from './projectDisplay.js'
import './styles.css';


export function initialize(projecthandler){
    const projectArea = document.quereySelector('#projects')
    projectArea.appendChild(...ProjectDisplay.displayAllProjects(projecthandler))
}
