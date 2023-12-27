import Todo from "./todos";
import Project from "./projects";
import Master from "./master";

//you need to pass all projects and todos through here 
//and have them update in localstorage, basically just another
//step in the process but then pageUpdate.js will access storage instead of master
//because storage will return the same thing ultimately as master does presently
//except it will be in localstorage. 
//This file takes care of parsing things to string and then back to JSON

const Storage = (() => {

    function loadMaster(){
        const serializedMaster = JSON.parse(localStorage.getItem('todos'));

        const master = Master();
        if(serializedMaster){
            let newTodo = serializedMaster.projects.map(projectData =>{
                const project = Project(projectData.title);

                projectData.projectTodos.forEach(todoData => {
                    project.addTodo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
                });
                return project;
            });
            master.setProjects(newTodo);
        }
        return master;
    }

    function saveMaster(data){
        localStorage.setItem('todos', JSON.stringify(data));
    };

    function newProject(project){
        const masterList = loadMaster();
        masterList.newProject(project);
        saveMaster(masterList);
    };

    function getProjectTitles(){
        const masterList = loadMaster();
        return masterList.getProjectTitles();
    }

    return {loadMaster, newProject, getProjectTitles}
})();

export default Storage;