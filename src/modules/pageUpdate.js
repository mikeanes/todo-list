import Master from "./master";

const master = Master();

let selectedProject = 'Default';
let projectForRename;
const renameModal = document.getElementById('renameModal');
const closeRenameModal = document.getElementById('closeRenameModal');
const confirmRename = document.getElementById('renameButton');
const renameInput = document.getElementById('renameProject');
const todoModal = document.getElementById('todoModal');
const closeTodoModal = document.getElementById('closeTodoModal');
let todoName = document.getElementById('todoName');
let todoDescription = document.getElementById('todoDescription');
let todoDate = document.getElementById('todoDate');
let todoPriority = document.getElementById('todoPriority');

function pageLoad(){
    projectDisplay();
    createProject();
    displayTodos();
    addTodo();
    renameModalFunction();
}

function renameModalFunction(){
    confirmRename.addEventListener("click", () => {
        renameProject(projectForRename, renameInput.value);
        projectForRename = '';
        renameModal.close();
        projectDisplay();
    });
    closeRenameModal.addEventListener("click", () => {
        renameModal.close();
    });
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
};

function deleteProject(index){
    let projectTitles = master.getProjectTitles();
    master.deleteProject(index);
    projectDisplay();
    if (selectedProject === projectTitles[index]){
        selectedProject = 'Default';
    }
    displayTodos();
};

function deleteTodo(projectTitle, todoIndex){
    
    master.removeTodoFromProject(projectTitle, todoIndex);

    displayTodos();
};





function selectProject(index){
    let projectTitles = master.getProjectTitles();
    selectedProject = projectTitles[index];
    displayTodos();
};

function clearInputs(){
    todoName.value = '';
    todoDescription.value = '';
    todoDate.value = '';
    todoPriority.selectedIndex = 0;
}; 

function addTodo(){
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

function displayTodos() {
    let todoList = document.getElementById('list');
    todoList.innerHTML = '';
    let projectTodos;
    projectTodos = [];
    const projectTitles = master.getProjectTitles();
    const newTodoButton = document.createElement('button');
    newTodoButton.innerHTML = 'Add New Todo';
    
    newTodoButton.addEventListener('click', () => {
        todoModal.showModal();
    });
    closeTodoModal.addEventListener('click', () => {
        todoModal.close();
    });

    if (selectedProject === 'Default') {
        projectTitles.forEach(title => {
            const todos = master.getTodoElements(title);
            projectTodos = projectTodos.concat(todos);
        });
    } else {
        projectTodos = master.getTodoElements(selectedProject);
    }

    if (selectedProject !== 'Default') {
        todoList.appendChild(newTodoButton);
    }

    projectTodos.forEach((info, index) => {
        const todoDiv = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        todoDiv.setAttribute('data-index', index);    

        editButton.addEventListener("click", () => {
            todoModal.showModal();
            todoName.value = '';
            todoDescription.value = '';
            todoDate.value = '';
            todoPriority.selectedIndex = 0;
        });
        deleteButton.addEventListener("click", () => {
            deleteTodo(selectedProject, index); 
        });

        todoDiv.appendChild(info);
        if (selectedProject !== 'Default'){
        todoDiv.appendChild(editButton);
        todoDiv.appendChild(deleteButton);
        }
        todoList.appendChild(todoDiv);
    });
};

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
         
            renameButton.addEventListener("click", () => {
                renameModal.showModal();
                renameInput.value = projectTitles[index];
                projectForRename = projectTitles[index];
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

function renameProject(oldTitle, newTitle){
    master.renameProject(oldTitle, newTitle);
};



export default pageLoad;