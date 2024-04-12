import { TodoItem } from "./todoObj";

export function submitNewTask(project) {
    const title = document.querySelector('#new-card-title').value
    // const status = document.querySelector('#new-card-status')
    const duedate = document.querySelector('#new-card-dueDate').value
    const priority = document.querySelector('#priority').value
    const detail = document.querySelector('#new-card-detail').value
    // const project = document.querySelector('#new-card-project')
    const status = 'not-started'
    let newTask = new TodoItem(title, status, priority, duedate, detail)
    
    // console.log(project.returnAllTasks())
    return project.addTask(newTask)
}
