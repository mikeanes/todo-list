import Project from "./projects";

const Master = () => {
    let projects = [];
    newProject('All Todos');
    newProject('Things');
    addTodoToProject('Things', 'Peepeepoo', 'reeeeee', '1999-12-01', 'High');
    addTodoToProject('Things', 'ShitFart', 'reee', '1992-10-09', 'High');

    
    
    function getProjects(){
        return projects;
    };
    function setProjects(array){
        projects = array;
    };

    function newProject(title){
        projects.push(Project(title));
    };

    function getProjectTitles(){
        return projects.map(project => project.getTitle());
    };

    function deleteProject(index){
        projects.splice(index, 1);
    };

    function renameProject(oldTitle, newTitle){
        console.log(`renameProject called with oldTitle: ${oldTitle}, newTitle: ${newTitle}`);
        const project = projects.find(project => project.getTitle() === oldTitle);
        if (project) {
            project.setTitle(newTitle);
        } else {
            console.error(`Project "${oldTitle}" not found.`);
        }
    };

    function addTodoToProject(projectTitle, title, description, dueDate, priority){
        const project = projects.find(project => project.getTitle() === projectTitle);

        if (project) {
            project.addTodo(title, description, dueDate, priority);
        } else {
            console.error(`Project "${projectTitle}" not found.`);
        }
    };

    function updateTodoInProject(projectTitle, todoIndex, title, description, dueDate, priority, completed) {
        const project = projects.find(project => project.getTitle() === projectTitle);
    
        if (project) {
            project.updateTodo(todoIndex, title, description, dueDate, priority, completed);
        } else {
            console.error(`Project "${projectTitle}" not found.`);
        }
    };    

    function getTodoInfo(projectTitle, todoIndex) {
        const project = projects.find(project => project.getTitle() === projectTitle);
    
        if (project) {
            const todo = project.getTodoInfo(todoIndex);
            return todo;
        } else {
            console.error(`Project "${projectTitle}" not found.`);
            return null;
        }
    };
    
    function removeTodoFromProject(projectTitle, todoIndex) {
        const project = projects.find(project => project.getTitle() === projectTitle);

        if (project) {
            project.removeTodo(todoIndex);
        } else {
            console.error(`Project "${projectTitle}" not found.`);
        }
    };

    function getTodoElements(projectTitle){
        const project = projects.find(project => project.getTitle() === projectTitle);
        if (project) {
            return project.todoElement();
        } else {
            console.error(`Project "${projectTitle}" not found.`);
        }
    };
    
    function toJSON(){
        return{
            projects: projects.map(project => project.toJSON())
        };
    }
  
    return {newProject, getProjectTitles, deleteProject, getProjects, addTodoToProject
            , getTodoElements, renameProject, removeTodoFromProject, updateTodoInProject, getTodoInfo, toJSON, setProjects};
}

export default Master;