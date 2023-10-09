

//Contain the array of projects
//Has default universal project that can access all todos
//Ability to create new projects


//IMPORTANT FOR FUTURE ENDEAVOR TO FINISH THIS
//Dont import projects.js into pageUpdate, only get the functions 
//from projects and use them somehow in here and then only import 
//this master file into pageUpdate. Like for example addTodo from
//the previous projects file can be ported over here and when used
//it will still add todos.

import Project from "./projects";

const Master = () => {
    let projects = [];
    newProject('Universal');
    addTodoToProject('Universal', 'Water Plants', 'water deez plantz', '2023-12-12', 'Urgent');

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