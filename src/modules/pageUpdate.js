import Master from "./master";

const master = Master();

let selectedProject = 'All Todos';
let projectForRename;
let selectedTodoIndex;
const renameModal = document.getElementById('renameModal');
const closeRenameModal = document.getElementById('closeRenameModal');
const confirmRename = document.getElementById('renameButton');
const renameInput = document.getElementById('renameProject');
const todoModal = document.getElementById('todoModal');
const closeTodoModal = document.getElementById('closeTodoModal');
const updateTodoButton = document.getElementById('updateTodo');
const addTodoButton = document.getElementById('addTodo');
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
};

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
    newProjectButton.innerHTML = '+ New Project';
    newProjectButton.classList.add('newProject');
    let projectTitles;
    newProjectButton.addEventListener('click', () => {
        projectTitles = master.getProjectTitles();
        newProjectModal.showModal();
    });
    closeModal.addEventListener('click', () => {
        newProjectModal.close();
    });
    taskbar.appendChild(newProjectButton);

    const projectTitle = document.getElementById('projectTitle');
    const addProject = document.getElementById('addProject');
    
    addProject.addEventListener('click', () => {
        
        if(projectTitle.value !== '' && projectTitles.includes(projectTitle.value) === false){
        master.newProject(projectTitle.value);
        newProjectModal.close();
        projectTitle.value = '';
        projectDisplay();
        }else if(projectTitles.includes(projectTitle.value)){
            alert('Project with this name already exists!');
        }else{
            alert("Project name can't be empty!");
        }
        
    });
};

function deleteProject(index){
    let projectTitles = master.getProjectTitles();
    master.deleteProject(index);
    projectDisplay();
    if (selectedProject === projectTitles[index]){
        selectedProject = 'All Todos';
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
        updateTodoButton.style.display = 'none';
        addTodoButton.style.display = '';
        clearInputs();
        todoModal.showModal();
    });
    closeTodoModal.addEventListener('click', () => {
        todoModal.close();
    });

    updateTodoButton.addEventListener('click', () => {
        master.updateTodoInProject(selectedProject, selectedTodoIndex, todoName.value, 
            todoDescription.value, todoDate.value, todoPriority.value);
        displayTodos();
        todoModal.close();
    });

    if (selectedProject === 'All Todos') {
        projectTitles.forEach(title => {
            const todos = master.getTodoElements(title);
            projectTodos = projectTodos.concat(todos);
        });
    } else {
        projectTodos = master.getTodoElements(selectedProject);
    }

    if (selectedProject !== 'All Todos') {
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
            selectedTodoIndex = index;
            updateTodoButton.style.display = '';
            addTodoButton.style.display = 'none';
            todoModal.showModal();
            
            todoName.value = todoInfo.title;
            todoDescription.value = todoInfo.description;
            todoDate.value = todoInfo.dueDate;
            const priorityOptions = todoPriority.options;
            for (let i = 0; i < priorityOptions.length; i++) {
                if (priorityOptions[i].value === todoInfo.priority) {
                    priorityOptions[i].selected = true;
                }
            }
        });
        deleteButton.addEventListener("click", () => {
            deleteTodo(selectedProject, index); 
        });

        todoDiv.appendChild(info);
        
        if (selectedProject !== 'All Todos'){
        todoDiv.appendChild(editButton);
        todoDiv.appendChild(deleteButton);
        }
        todoList.appendChild(todoDiv);
    });
};

function projectDisplay() {
    const projectsHeader = document.createElement('h2');
    projectsHeader.innerText = 'Projects';
    projectsHeader.classList.add('projectsHeader');
    const projectsIcon = document.createElement('i');
    projectsIcon.classList.add('fa');
    projectsIcon.classList.add('fa-folder');
    projectsHeader.appendChild(projectsIcon);
    const allTodoIcon = document.createElement('i');
    allTodoIcon.classList.add('fa');
    allTodoIcon.classList.add('fa-house');
    let projects = document.getElementById('projects');
    projects.innerHTML = '';
    let projectTitles = master.getProjectTitles();
    projectTitles.forEach((title, index) => {
        const projectDiv = document.createElement("div");
        const projectTitle = document.createElement('p');

        if (title !== 'All Todos') {
            const deleteButton = document.createElement('button');
            const renameButton = document.createElement('button');
            
            deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
            renameButton.innerHTML = '<i class="fa fa-pen"></i>';
            deleteButton.addEventListener("click", () => {
                deleteProject(index);
            });
         
            renameButton.addEventListener("click", () => {
                renameModal.showModal();
                renameInput.value = projectTitles[index];
                projectForRename = projectTitles[index];
            });
            projectDiv.classList.add('project');
            projectDiv.appendChild(deleteButton);
            projectDiv.appendChild(renameButton);
        }else{
            projectDiv.classList.add('allTodos');
            projectDiv.appendChild(projectsHeader);
        }
      
        projectDiv.setAttribute("data-index", index);
        projectTitle.textContent = title;
        if (title === 'All Todos'){
            projectTitle.appendChild(allTodoIcon);
        }
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
