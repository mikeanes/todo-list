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
    

    function addTodo(title, description, dueDate, priority){
        projectTodos.push(Todo(title, description, dueDate, priority));
    }
    function getProjectTodos(){
        return projectTodos.map(todos => todos.toString());
    }

    return{setTitle, getTitle, addTodo, getProjectTodos};
}

export default Project;