import Project from "./projects";
import Master from "./master";

const Storage = (() => {
    function loadMaster() {
        const serializedMaster = JSON.parse(localStorage.getItem('todos'));

        const master = Master();
        if (serializedMaster && serializedMaster.projects) {
            let newTodo = serializedMaster.projects.map((projectData) => {
                const project = Project(projectData.title);

                if (projectData.todos && Array.isArray(projectData.todos)) {
                    projectData.todos.forEach((todoData) => {
                        project.addTodo(
                            todoData.title,
                            todoData.description,
                            todoData.dueDate,
                            todoData.priority,
                            todoData.completed
                        );
                    });
                }
                return project;
            });
            master.setProjects(newTodo);
        }
        return master;
    }

    function saveMaster(data) {
        localStorage.setItem('todos', JSON.stringify(data));
    }

    function newProject(project) {
        const masterList = loadMaster();
        masterList.newProject(project);
        saveMaster(masterList);
    }

    function deleteProject(index) {
        const masterList = loadMaster();
        masterList.deleteProject(index);
        saveMaster(masterList);
    }

    function renameProject(oldTitle, newTitle) {
        const masterList = loadMaster();
        masterList.renameProject(oldTitle, newTitle);
        saveMaster(masterList);
    }

    function getProjectTitles() {
        const masterList = loadMaster();
        return masterList.getProjectTitles();
    }

    function addTodoToProject(projectTitle, title, description, dueDate, priority, completed) {
        const masterList = loadMaster();
        masterList.addTodoToProject(projectTitle, title, description, dueDate, priority, completed);
        saveMaster(masterList);
    }

    function updateTodoInProject(projectTitle, todoIndex, title, description, dueDate, priority, completed) {
        const masterList = loadMaster();
        masterList.updateTodoInProject(projectTitle, todoIndex, title, description, dueDate, priority, completed);
        saveMaster(masterList);
    }

    function removeTodoFromProject(projectTitle, todoIndex) {
        const masterList = loadMaster();
        masterList.removeTodoFromProject(projectTitle, todoIndex);
        saveMaster(masterList);
    }

    function getTodoInfo(projectTitle, todoIndex) {
        const masterList = loadMaster();
        return masterList.getTodoInfo(projectTitle, todoIndex);
    }

    function getTodoElements(projectTitle) {
        const masterList = loadMaster();
        return masterList.getTodoElements(projectTitle);
    }

    return {
        loadMaster,
        newProject,
        getProjectTitles,
        addTodoToProject,
        getTodoInfo,
        removeTodoFromProject,
        getTodoElements,
        updateTodoInProject,
        deleteProject,
        renameProject,
    };
})();

export default Storage;
