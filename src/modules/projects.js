import Todo from "./todos";

const Project = (title) => {
    let projectTodos = [];

    function addTodo(title, description, dueDate, priority, checklist){
        projectTodos.push(Todo(title, description, dueDate, priority, checklist));
    }

    return{title, addTodo};
}

export default Project;