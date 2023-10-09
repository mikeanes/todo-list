import Master from "./master";

const master = Master();

let selectedProject;

function pageLoad(){
    projectDisplay();
    createProject();
    displayTodos();
}
//Function for getting the projects and displaying them
function projectDisplay(){
    let projects = document.getElementById('projects');
    projects.innerHTML = '';
    let projectTitles = master.getProjectTitles();
    projectTitles.forEach((title, index) => {
        const projectDiv = document.createElement("div");
        const projectTitle = document.createElement('p');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        projectDiv.classList.add('project');
        projectDiv.setAttribute("data-index", index);
        projectTitle.textContent = title;
        projectDiv.appendChild(projectTitle);
        projectTitle.addEventListener("click", () => {
            selectProject(index);
          });
        deleteButton.addEventListener("click", () => {
            deleteProject(index);
        });
        projectDiv.appendChild(deleteButton);
        projects.appendChild(projectDiv);
        
      });
    console.log(master.getProjectTitles());
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

function deleteProject(index){
    master.deleteProject(index);
    projectDisplay();
};

//Need function for selecting current project
//When a project is selected all todos created will be added to it
function selectProject(index){
    let projectTitles = master.getProjectTitles();
    selectedProject = projectTitles[index];
    console.log(selectedProject);
};

//Function for adding new todos 
function addTodo(){
    let todoList = document.getElementById('list');
    let newTodoButton = document.createElement('button');
    
};

function displayTodos(){
    let todoList = document.getElementById('list');
    todoList.innerText = master.getTodos('Universal');
};

export default pageLoad;