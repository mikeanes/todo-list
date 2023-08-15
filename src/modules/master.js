import Project from "./projects";

//Contain the array of projects
//Has default universal project that can access all todos
//Ability to create new projects

const Master = () => {
    let projects = [];
    newProject('Universal');

    function getProjects(){
        return projects.map(project => project.getTitle());
    };

    function newProject(title){
        projects.push(Project(title));
    };

    
    return {newProject, getProjects};
}

export default Master;