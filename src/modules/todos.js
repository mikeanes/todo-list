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

        const checkmarkLabel = document.createElement('label');
        checkmarkLabel.classList.add('checkbox');
        const checkmarkSpan = document.createElement('span');
        checkmarkSpan.classList.add('checkbox__inner');
        const completedCheckmark = document.createElement('input');
        completedCheckmark.classList.add('checkbox__input');
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
        checkmarkLabel.appendChild(completedCheckmark);
        checkmarkLabel.appendChild(checkmarkSpan);


        const titleElement = document.createElement('p');
        titleElement.textContent = `${_title}`;
        titleElement.classList.add('todo-title');
        if(_priority === 'High'){
            titleElement.classList.add('highPriority');
        }else if(_priority === 'Medium'){
            titleElement.classList.add('mediumPriority');  
        }else if(_priority === 'Low'){
            titleElement.classList.add('lowPriority');
        }

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `${_description}`;
        descriptionElement.classList.add('todo-description');

        const dateElement = document.createElement('p');
        dateElement.textContent = `${_dueDate}`;
        dateElement.classList.add('todo-date');
        
        todoDiv.appendChild(titleElement);
        todoDiv.appendChild(descriptionElement);
        todoDiv.appendChild(dateElement);
        todoDiv.appendChild(checkmarkLabel);

        return todoDiv;
        
    };

    ///////// EXPERIMENTAL //////////
    function toJSON() {
        return {
            title: _title,
            description: _description,
            dueDate: _dueDate,
            priority: _priority,
            completed: _completed,
        };
    }


    return{getTitle, getDescription, getDueDate, getPriority,
         setTitle, setDescription, setDueDate, setPriority, todoElement, 
         getProjectName, getCompleted, setCompleted, toJSON};
};

export default Todo;