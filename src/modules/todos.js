const Todo = (title, description, dueDate, priority) => {

    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;

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
    return{getTitle, getDescription, getDueDate, getPriority};
};

export default Todo;