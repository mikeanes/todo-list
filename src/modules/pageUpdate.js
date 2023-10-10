import Master from "./master";

const master = Master();

let selectedProject = 'Default';

function pageLoad(){
    projectDisplay();
    createProject();
    displayTodos();
    addTodo();
}

function projectDisplay() {
    let projects = document.getElementById('projects');
    projects.innerHTML = '';
    let projectTitles = master.getProjectTitles();
    projectTitles.forEach((title, index) => {
        const projectDiv = document.createElement("div");
        const projectTitle = document.createElement('p');

        if (title !== 'Default') {
            const deleteButton = document.createElement('button');
            const renameButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            renameButton.innerHTML = 'Rename';
            deleteButton.addEventListener("click", () => {
                deleteProject(index);
            });
            projectDiv.appendChild(deleteButton);
            projectDiv.appendChild(renameButton);
        }

        projectDiv.classList.add('project');
        projectDiv.setAttribute("data-index", index);
        projectTitle.textContent = title;
        projectDiv.appendChild(projectTitle);

        projectTitle.addEventListener("click", () => {
            selectProject(index);
        });

        projects.appendChild(projectDiv);
    });
    console.log(master.getProjectTitles());
};


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
    let projectTitles = master.getProjectTitles();
    master.deleteProject(index);
    projectDisplay();
    if (selectedProject === projectTitles[index]){
        selectedProject = 'Default';
    }
    displayTodos();
};

function selectProject(index){
    let projectTitles = master.getProjectTitles();
    selectedProject = projectTitles[index];
    displayTodos();
    console.log(selectedProject);
};

function displayTodos() {
    let todoList = document.getElementById('list');
    todoList.innerHTML = '';

    let projectTodos;

    if (selectedProject === 'Default') {
        const projectTitles = master.getProjectTitles();
        projectTodos = [];
        projectTitles.forEach(title => {
            const todos = master.getTodoElements(title);
            projectTodos = projectTodos.concat(todos);
        });
    } else {
        projectTodos = master.getTodoElements(selectedProject);
    }

    if (selectedProject !== 'Default') {
        let todoModal = document.getElementById('todoModal');
        let closeTodoModal = document.getElementById('closeTodoModal');
        let newTodoButton = document.createElement('button');
        newTodoButton.innerHTML = 'Add New Todo';

        newTodoButton.addEventListener('click', () => {
            todoModal.showModal();
        });
        closeTodoModal.addEventListener('click', () => {
            todoModal.close();
        });

        todoList.appendChild(newTodoButton);
    }

    projectTodos.forEach((info, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.setAttribute('data-index', index);
        todoDiv.appendChild(info);
        todoList.appendChild(todoDiv);
    });
}

function addTodo(){
    let todoModal = document.getElementById('todoModal');
    let todoName = document.getElementById('todoName');
    let todoDescription = document.getElementById('todoDescription');
    let todoDate = document.getElementById('todoDate');
    let todoPriority = document.getElementById('todoPriority');
    function clearInputs(){
        todoName.value = '';
        todoDescription.value = '';
        todoDate.value = '';
        todoPriority.selectedIndex = 0;
    } 
    const todoForm = document.getElementById('todoForm');
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!todoForm.checkValidity()) {
            event.preventDefault();
            return;
        }
        master.addTodoToProject(selectedProject, todoName.value, 
            todoDescription.value, todoDate.value, todoPriority.value);
        todoModal.close();
        displayTodos();
        clearInputs();
});
};

export default pageLoad;