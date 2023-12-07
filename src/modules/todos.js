const Todo = (title, description, dueDate, priority) => {

    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;

    let completed = false;
    let _completed = completed;

    function getCompleted(){
        return _completed;
    };
    function setCompleted(value){
        _completed = value;
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
    function getProjectName(){
        return _projectName;
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

        const completedCheckmark = document.createElement('input');
        completedCheckmark.type = 'checkbox';
        completedCheckmark.id = 'completedCheckmark';
        completedCheckmark.addEventListener('change', () => {
            if(completedCheckmark.checked === true){
                setCompleted(true);
            }else{
                setCompleted(false);
            }
        })
        if (getCompleted()){
            completedCheckmark.checked = true;
        }else{
            completedCheckmark.checked = false;
        }


        const titleElement = document.createElement('p');
        titleElement.textContent = `${_title}`;
        titleElement.classList.add('todo-title');

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `${_description}`;
        descriptionElement.classList.add('todo-description');

        const dateElement = document.createElement('p');
        dateElement.textContent = `${_dueDate}`;
        dateElement.classList.add('todo-date');

        const priorityElement = document.createElement('p');
        //priorityElement.textContent = `${_priority}`;
        priorityElement.classList.add('todo-priority');
        
        todoDiv.appendChild(titleElement);
        todoDiv.appendChild(descriptionElement);
        todoDiv.appendChild(dateElement);
        todoDiv.appendChild(priorityElement);
        todoDiv.appendChild(completedCheckmark);

        return todoDiv;
        
    };
    return{getTitle, getDescription, getDueDate, getPriority,
         setTitle, setDescription, setDueDate, setPriority, todoElement, 
         getProjectName, getCompleted, setCompleted};
};

export default Todo;