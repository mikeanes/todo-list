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
    function toString(){
        return _title + ' ' + _description + ' ' + _dueDate + ' ' + _priority;
    };
    return{getTitle, getDescription, getDueDate, getPriority,
         setTitle, setDescription, setDueDate, setPriority, toString};
};

export default Todo;