import Master from "./master";

const master = Master();

function pageLoad(){
    projectDisplay();
    createProject();
}
//Function for getting the projects and displaying them
function projectDisplay(){
    let projects = document.getElementById('projects');
    projects.innerHTML = master.getProjects();
    console.log(master.getProjects());
}

function createProject(){
    let taskbar = document.getElementById('taskbar');
    const newProjectButton = document.createElement('button');
    const newProjectModal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
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

//Function to create new Projects and displaying

//Function for adding new todos 
export default pageLoad;