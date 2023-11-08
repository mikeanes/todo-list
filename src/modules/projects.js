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
        projectTodos.push(Todo(title, description, dueDate, priority, getTitle()));
    };

    function removeTodo(index) {
        if (index >= 0 && index < projectTodos.length) {
            projectTodos.splice(index, 1);
        }
    };

    function updateTodo(index, title, description, dueDate, priority) {
        if (index >= 0 && index < projectTodos.length) {
            projectTodos[index].setTitle(title);
            projectTodos[index].setDescription(description);
            projectTodos[index].setDueDate(dueDate);
            projectTodos[index].setPriority(priority);
        }
    };

    function getTodoInfo(index) {
        if (index >= 0 && index < projectTodos.length) {
            const todo = projectTodos[index];
            return {
                title: todo.getTitle(),
                description: todo.getDescription(),
                dueDate: todo.getDueDate(),
                priority: todo.getPriority(),
            };
        }
    };
    

    function getProjectTodos(){
        return projectTodos.map(todos => todos.toString());
    };

    function todoElement(){
        return projectTodos.map(todos => todos.todoElement());
    };
    
    return{setTitle, getTitle, addTodo, getProjectTodos, todoElement, removeTodo, updateTodo, getTodoInfo};
}

export default Project;