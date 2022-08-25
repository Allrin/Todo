export function render(arrTodo) {
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
}