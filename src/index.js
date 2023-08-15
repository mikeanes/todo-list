import './style.css';
import Todo from './modules/todos';
import Project from './modules/projects';

let testTodo = Todo('Test', 'This is a test todo', 'January 7', 'High');
console.log(testTodo.toString());
let testProject = Project('Projickt');
console.log(testProject.getTitle());
// testProject.addTodo('Title', 'descrippption', 'Avril 14', 'Low');
// testProject.addTodo('Tittys', 'balls', 'Avril 16', 'Medium');
testProject.addTodo(testTodo);
console.log(testProject.getProjectTodos());

