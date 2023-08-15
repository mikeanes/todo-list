import './style.css';
import Todo from './modules/todos';
import Project from './modules/projects';
import Master from './modules/master';
import pageLoad from './modules/pageUpdate';

let testTodo = Todo('Test', 'This is a test todo', 'January 7', 'High');
let secondTodo = Todo('Mr Swartz', 'This is fake', 'Avril4', 'High');

console.log(testTodo.toString());

let testProject = Project('Projickt');

console.log(testProject.getTitle());

// testProject.addTodo('Title', 'descrippption', 'Avril 14', 'Low');
// testProject.addTodo('Tittys', 'balls', 'Avril 16', 'Medium');

testProject.addTodo(testTodo);
testProject.addTodo(secondTodo);


pageLoad();

