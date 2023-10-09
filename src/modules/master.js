import Project from "./projects";

const Master = () => {
    let projects = [];
    newProject('Default');
    newProject('Things');
    addTodoToProject('Things', 'Peepeepoo', 'reeeeee', '0000-00-00', 'High');

    function getProjects(){
        return projects;
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

    function addTodoToProject(projectTitle, title, description, dueDate, priority){
        const project = projects.find(project => project.getTitle() === projectTitle);

        if (project) {
            project.addTodo(title, description, dueDate, priority);
        } else {
            console.error(`Project "${projectTitle}" not found.`);
        }
    };

    function getTodos(projectTitle){
        const project = projects.find(project => project.getTitle() === projectTitle);
        if (project) {
            return project.getProjectTodos();
        } else {
            console.error(`Project "${projectTitle}" not found.`);
        }
    };
    return {newProject, getProjectTitles, deleteProject, getProjects, addTodoToProject
            , getTodos};
}

export default Master;