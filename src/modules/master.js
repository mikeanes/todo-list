import Project from "./projects";

//Contain the array of projects
//Has default universal project that can access all todos
//Ability to create new projects


//IMPORTANT FOR FUTURE ENDEAVOR TO FINISH THIS
//Dont import this file into pageUpdate, only get the functions 
//from projects and use them somehow in here and then only import 
//this master file into pageUpdate. Like for example addTodo from
//the previous projects file can be ported over here and when used
//it will still add todos.
const Master = () => {
    let projects = [];
    newProject('Universal');

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

    return {newProject, getProjectTitles, deleteProject, getProjects};
}

export default Master;