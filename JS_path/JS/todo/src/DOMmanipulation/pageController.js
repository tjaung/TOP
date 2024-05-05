import { Project } from "../objects/projectObj.js";
import '../styles/projectArea.css';
import { Sidebar } from "./sidebar.js";
import { ProjectRenderer } from "./projectDisplay.js";

export class PageInitializer {
    constructor(projectHandler) {
        this.projectHandler = projectHandler;
        this.sidebar = new Sidebar(this.projectHandler);
    }

    setProjectHandler(projectHandler) {
        this.projectHandler = projectHandler;
    }

    setCreateNewProjectButton() {
        const newProjectButton = document.querySelector('#new-project-button');
        newProjectButton.addEventListener('click', this.createSingleProject.bind(this));
    }

    createSingleProject() {
        const newProjectTitleBase = 'New Project';
        let i = 1;
        let newProjectTitle;

        const projectTitles = this.projectHandler.returnAllProjectTitles();
        if (projectTitles.includes(newProjectTitleBase)) {
            do {
                newProjectTitle = newProjectTitleBase + i;
                i += 1;
            } while (projectTitles.includes(newProjectTitle));
        } else {
            newProjectTitle = newProjectTitleBase;
            i = 1
        }

        const newProject = new Project(newProjectTitle);
        const newProjectRenderer = new ProjectRenderer(this.projectHandler, newProject, this.sidebar);
        this.projectHandler.addProject(newProject);
        newProjectRenderer.createProjectDOM(true);
        this.sidebar.displayProjects();
    }

    initialize() {
        const projectList = this.projectHandler.returnAllProjects();
        for (const proj of projectList) {
            const projectManager = new ProjectRenderer(this.projectHandler, proj, this.sidebar);
            projectManager.createProjectDOM();
            projectManager.placeTaskCardsIntoProjectDOM();
        }
        this.sidebar.activateSidebar();
        this.sidebar.displayProjects();
        this.setCreateNewProjectButton();
    }
}