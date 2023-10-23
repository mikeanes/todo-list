let count = 0;

const Todo = (title, description, dueDate, priority, projectName) => {

    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    let _id = generateID();
    let _projectName = projectName;

    //create a unique identifier for every todo that is made here and then access that to delete

    function getID(){
        return _id;
    };
    function generateID(){
        return count++;
    };
    function getTitle(){
        return _title;
    };
    function getDescription(){
        return _description;
    };
    function getDueDate(){
        return _dueDate;
    };
    function getPriority(){
        return _priority;
    };
    function setTitle(value){
        _title = value;
    };
    function setDescription(value){
        _description = value;
    };
    function setDueDate(value){
        _dueDate = value;
    };
    function setPriority(value){
        _priority = value;
    };

    function todoElement(){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const titleElement = document.createElement('p');
        titleElement.textContent = `Todo Title: ${_title}`;
        titleElement.classList.add('todo-title');

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${_description}`;
        descriptionElement.classList.add('todo-description');

        const dateElement = document.createElement('p');
        dateElement.textContent = `Due Date: ${_dueDate}`;
        dateElement.classList.add('todo-date');

        const priorityElement = document.createElement('p');
        priorityElement.textContent = `Priority: ${_priority}`;
        priorityElement.classList.add('todo-priority');

        todoDiv.appendChild(titleElement);
        todoDiv.appendChild(descriptionElement);
        todoDiv.appendChild(dateElement);
        todoDiv.appendChild(priorityElement);
        
        return todoDiv;
    };
    return{getTitle, getDescription, getDueDate, getPriority,
         setTitle, setDescription, setDueDate, setPriority, todoElement, getID};
};

export default Todo;