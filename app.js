const root = document.getElementById('root');

import { getDate } from './date.js';
import { createElement } from './element.js';

const todos = JSON.parse(localStorage.getItem('todos')) || [];

let container = createElement('div', 'container');
let formTodo = createElement('form', 'todo');
root.append(formTodo);
let todoTitle = createElement('div', 'todoTitle');
let deleteBtn = createElement('button', 'btn col-3', 'Delete All');
let nameTodo = createElement('input', 'nameTodo col-6');
nameTodo.placeholder = 'Enter todo ...';
let addBtn = createElement('button', 'btn col-3', 'Add');
let search = createElement('div', 'searchTodo');
let rez = createElement('p', 'col-3 rez');
let showAllBtn = createElement('button', 'btn col-3', 'Show All');
let showComplBtn = createElement('button', 'btn col-3', 'Show Completed');
let searchInput = createElement('input', 'serach col-3');
searchInput.placeholder = 'Search...';
formTodo.append(todoTitle);
todoTitle.append(deleteBtn, nameTodo, addBtn);
formTodo.append(search);
search.append(rez, showAllBtn, showComplBtn, searchInput);
formTodo.append(container);

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameTodo.value != '') {
        todos.push({
            id: Math.random(),
            date: getDate(),
            text: nameTodo.value,
            isChecked: false,
        });
        nameTodo.style.borderColor = 'black';
        nameTodo.value = '';

        localStorage.setItem('todos', JSON.stringify(todos));
        render(todos);
    } else {
        nameTodo.style.borderColor = 'red';
    }
});

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todos.length = 0;
    localStorage.setItem('todos', JSON.stringify(todos));
    render(todos);
});

nameTodo.addEventListener('keydown', (e) => {
    if (nameTodo.value != '' && e.keyCode === 13) {
        e.preventDefault();
        todos.push({
            id: Math.random(),
            date: getDate(),
            text: nameTodo.value,
            isChecked: false,
        });
        nameTodo.style.borderColor = 'black';
        nameTodo.value = '';
        localStorage.setItem('todos', JSON.stringify(todos));
        render(todos);
    } else if (nameTodo.value === '' && e.keyCode === 13) {
        e.preventDefault();
        nameTodo.style.borderColor = 'red';
    }
});

container.addEventListener('click', ({ target, tagName }) => {
    if ((tagName = 'DIV') && target.classList.contains('shellTodo')) {
        let todo = todos.find((el) => el.id === +target.id);
        let indexTodo = todos.indexOf(todo);
        todos[indexTodo].isChecked =
            todos[indexTodo].isChecked === false ? true : false;
    }
    if ((tagName = 'BUTTON' && target.textContent === '🞩')) {
        let divTodo = target.closest('.shellTodo');
        let todo = todos.find((el) => el.id === +divTodo.id);
        let indexTodo = todos.indexOf(todo);
        todos.splice(indexTodo, 1);
    }
    if ((tagName = 'BUTTON') && target.classList.contains('todoBtnReady')) {
        let divTodo = target.closest('.shellTodo');
        let todo = todos.find((el) => el.id === +divTodo.id);
        let indexTodo = todos.indexOf(todo);
        todos[indexTodo].isChecked =
            todos[indexTodo].isChecked === false ? true : false;
    }
    if ((tagName = 'P') && target.classList.contains('todoText')) {
        let divTodo = target.closest('.shellTodo');
        let todo = todos.find((el) => el.id === +divTodo.id);
        let indexTodo = todos.indexOf(todo);
        todos[indexTodo].isChecked =
            todos[indexTodo].isChecked === false ? true : false;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    searchInput.value = '';
    render(todos);
});

showComplBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let arr = todos.filter((el) => el.isChecked === true);
    render(arr);
});

searchInput.addEventListener('input', () => {
    let searhArr = todos.filter((el) => {
        return el.text.toLowerCase().includes(searchInput.value.toLowerCase());
    });
    render(searhArr);
});

searchInput.addEventListener('mouseout', (e) => {
    e.preventDefault();
    searchInput.value = '';
});

function render(arrTodo) {
    container.innerHTML = '';
    arrTodo.forEach((el) => {
        let shellTodo = createElement('div', 'shellTodo');
        shellTodo.id = el.id;
        let performedBtn = createElement('button', 'btn todoBtnReady');
        let textTodo = createElement('p', 'todoText col-9', el.text);
        let closeBtn = createElement(
            'button',
            'btn todoBtnDelete btnActive',
            '🞩'
        );
        if (el.isChecked) {
            performedBtn.innerText = '✓';
            shellTodo.style.backgroundColor = 'grey';
            textTodo.style.textDecoration = 'line-through';
        }
        let dataText = createElement('span', 'dataText', el.date);
        shellTodo.append(performedBtn, textTodo, closeBtn, dataText);
        container.append(shellTodo);
    });
    result();
}

function result() {
    let col = 0;
    rez.innerText = 'All: 0 Completed: 0';
    todos.forEach((el) => {
        if (el.isChecked) {
            col++;
        }
    });
    rez.innerText = `All: ${todos.length}, Completed: ${col}`;
}

render(todos);
