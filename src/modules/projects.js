import Todo from "./todos";

const Project = (title) => {

    let _title = title;
    let projectTodos = [];

    function setTitle(value){
        _title = value;
    };

    function getTitle(){
        return _title;
    };
    

    function addTodo(todo){
        //title, description, dueDate, priority
        projectTodos.push(todo);
    }
    function getProjectTodos(){
        return projectTodos.toString();
    }

    return{setTitle, getTitle, addTodo, getProjectTodos};
}

export default Project;