import Master from "./master";
import Project from "./projects";

const master = Master();


function pageLoad(){
    projectDisplay();
    createProject();
}
//Function for getting the projects and displaying them
function projectDisplay(){
    let projects = document.getElementById('projects');
    projects.innerHTML = '';
    let projectTitles = master.getProjects();
    projectTitles.forEach((title, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add('project');
        projectDiv.setAttribute("data-index", index);
        projectDiv.textContent = title;
        projects.appendChild(projectDiv);
        projectDiv.addEventListener("click", () => {
            handleProjectClick(index);
          });
      });
    console.log(master.getProjects());
}

//Function to create new Projects and displaying
function createProject(){
    let taskbar = document.getElementById('taskbar');
    const newProjectButton = document.createElement('button');
    const newProjectModal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeProjectModal');
    newProjectButton.innerHTML = 'New Project';
    newProjectButton.addEventListener('click', () => {
        newProjectModal.showModal();
    });
    closeModal.addEventListener('click', () => {
        newProjectModal.close();
    });
    taskbar.appendChild(newProjectButton);

    const projectTitle = document.getElementById('projectTitle');
    const addProject = document.getElementById('addProject');
    addProject.addEventListener('click', () => {
        master.newProject(projectTitle.value);
        newProjectModal.close();
        projectTitle.value = '';
        projectDisplay();
    });
}

//Function for adding new todos 
function addTodo(){
    let todoList = document.getElementById('list');
    let newTodoButton = document.createElement('button');

}

export default pageLoad;