import { Project } from "./projectObj";
import { TodoItem } from "./todoObj";
import {ProjectHandler} from './projectHandler.js'
import * as ProjectDisplay from './projectDisplay.js'
import { PageInitializer } from "./pageController.js";
import './styles/main.css';

const projectHandler = new ProjectHandler()

const testTask1 = new TodoItem(
    'do the thing',
    'not-started',
    'high',
    '8/17/2034',
    'you need to do the thing')

const testTask2 = new TodoItem(
    'do this thing too',
    'completed',
    'low',
    '9/17/2034',
    'you need to do the thing but not more important than other thing')

const testProject = new Project(
    'testProject'
)

const testTask3 = new TodoItem(
    'this is in project 2',
    'in-progress',
    'medium',
    '9/17/2034',
    'you need to do the thing but not more important than other thing')

testProject.addTask(testTask1)
testProject.addTask(testTask2)

projectHandler.addProject(testProject)

const project2 = new Project('second project')
project2.addTask(testTask3)
projectHandler.addProject(project2)

console.log(projectHandler.returnAllProjects())
let Page = new PageInitializer(projectHandler)

Page.initialize(projectHandler)

export {Page}