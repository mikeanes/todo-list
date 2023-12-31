import Storage from './storage';

let selectedProject = 'All Todos';
let projectForRename;
let selectedTodoIndex;
let projectTitlesForRename;
const renameModal = document.getElementById('renameModal');
const closeRenameModal = document.getElementById('closeRenameModal');
const confirmRename = document.getElementById('renameButton');
const renameInput = document.getElementById('renameProject');
const todoModal = document.getElementById('todoModal');
const closeTodoModal = document.getElementById('closeTodoModal');
const updateTodoButton = document.getElementById('updateTodo');
const addTodoButton = document.getElementById('addTodo');
const taskbar = document.getElementById('taskbar');
const list = document.getElementById('list');
const todoName = document.getElementById('todoName');
const todoDescription = document.getElementById('todoDescription');
const todoDate = document.getElementById('todoDate');
const todoPriority = document.getElementById('todoPriority');
const hamburger = document.getElementById('hamburger');
const parentList = document.getElementById('parentList');
const updatingProjectTitle = document.getElementById('updatingProjectTitle');
updatingProjectTitle.innerHTML = 'All Todos';

const logoContainer = document.getElementById('logoContainer');

const fartLogo = document.createElement('div');

function pageLoad(){
    projectDisplay();
    createProject();
    displayTodos();
    addTodo();
    renameModalFunction();
    hamburgerMenu();

    fartLogo.classList.add('logo');
    logoContainer.appendChild(fartLogo);

};

function hamburgerMenu(){
    hamburger.addEventListener('click', () => {
        if(taskbar.style.display === 'none' && parentList.style.gridColumn === '1 / 3'){
            parentList.removeAttribute('style');
            taskbar.removeAttribute('style');
            
        }else{
            taskbar.style.display = 'none';
            parentList.style.gridColumn = '1 / 3';
            parentList.style.gridRow = '2/4';
        }
    });
}

function renameModalFunction(){
    confirmRename.addEventListener("click", () => {
        if(renameInput.value !== '' && projectTitlesForRename.includes(renameInput.value) === false){
        renameProject(projectForRename, renameInput.value);
        projectForRename = '';
        renameModal.close();
        projectDisplay();
        }else if(projectTitlesForRename.includes(renameInput.value)){
            alert('Project with this name already exists!');
        }else{
            alert("Project name can't be empty!");
        }
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
        projectTitles = Storage.getProjectTitles();
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
        Storage.newProject(projectTitle.value);
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
    let projectTitles = Storage.getProjectTitles();
    Storage.deleteProject(index);
    projectDisplay();
    if (selectedProject === projectTitles[index]){
        selectedProject = 'All Todos';
    }
    displayTodos();
};

function deleteTodo(projectTitle, todoIndex){
    Storage.removeTodoFromProject(projectTitle, todoIndex);
    displayTodos();
};

function selectProject(index){
    let projectTitles = Storage.getProjectTitles();
    selectedProject = projectTitles[index];
    updatingProjectTitle.innerHTML = selectedProject;
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
        Storage.addTodoToProject(selectedProject, todoName.value, 
            todoDescription.value, todoDate.value, todoPriority.value);
        todoModal.close();
        displayTodos();
        clearInputs();
});
};

function displayTodos() {
    list.innerHTML = '';
    let projectTodos;
    projectTodos = [];
    const projectTitles = Storage.getProjectTitles();
    const newTodoButton = document.createElement('button');
    newTodoButton.innerHTML = '+ Add New Todo';
    
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
        Storage.updateTodoInProject(selectedProject, selectedTodoIndex, todoName.value, 
            todoDescription.value, todoDate.value, todoPriority.value);
        displayTodos();
        todoModal.close();
    });

    if (selectedProject === 'All Todos') {
        projectTitles.forEach(title => {
            const todos = Storage.getTodoElements(title);
            projectTodos = projectTodos.concat(todos);
        });
    } else {
        projectTodos = Storage.getTodoElements(selectedProject);
    }

    if (selectedProject !== 'All Todos') {
        list.appendChild(newTodoButton);
    }

    projectTodos.forEach((info, index) => {
        const todoDiv = document.createElement('div');
        const todoInfo = Storage.getTodoInfo(selectedProject, index);
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa fa-pen"></i>';
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
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
        list.appendChild(todoDiv);
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
    let projectTitles = Storage.getProjectTitles();
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
                projectTitlesForRename = Storage.getProjectTitles();
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

};

function renameProject(oldTitle, newTitle){
    Storage.renameProject(oldTitle, newTitle);
};

export default pageLoad;
