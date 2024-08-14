document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Проверям, что tasks - это массив
    if (!Array.isArray(tasks)) {
        tasks = [];
    }

    function renderTasks() {
        taskList.innerHTML = ''; // Очистка списка задач
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            li.classList.toggle('completed', task.completed); // Добавление класса для выполненной задачи

            // Кнопка пометки как выполненной
            const doneBtn = document.createElement('button');
            doneBtn.className = 'doneBtn';
            const doneIcon = document.createElement('i');
            doneIcon.className = task.completed ? 'fas fa-undo' : 'fas fa-check'; // Иконка для "Вернуть" или "Сделано"
            doneBtn.appendChild(doneIcon);
            doneBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Остановка всплытия события
                task.completed = !task.completed; // Переключение статуса выполнения
                saveTasks();
                renderTasks(); // Обновление отображаемого списка задач
            });

            // Кнопка редактирования задачи
            const editBtn = document.createElement('button');
            editBtn.className = 'editBtn';
            const editIcon = document.createElement('i');
            editIcon.className = 'fas fa-edit'; // Иконка редактирования
            editBtn.appendChild(editIcon);
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Остановка всплытия события
                const newTaskText = prompt('Редактировать задачу:', task.text);
                if (newTaskText !== null) {
                    task.text = newTaskText;
                    saveTasks();
                    renderTasks();
                }
            });

            // Кнопка удаления задачи
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Удалить';
            deleteBtn.className = 'deleteBtn';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Остановка всплытия события
                tasks.splice(index, 1); // Удаление задачи из массива
                saveTasks();
                renderTasks();
            });

            // Добавляем кнопки к элементу li
            li.appendChild(doneBtn);      // Добавление кнопки "Сделано"/"Вернуть"
            li.appendChild(editBtn);      // Добавление кнопки редактирования
            li.appendChild(deleteBtn);    // Добавление кнопки удаления
            taskList.appendChild(li);     // Добавление элемента li к списку задач
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Сохранение задач в localStorage
    }

    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() === '') return; // Проверка на пустое значение

        tasks.push({ text: taskInput.value, completed: false }); // Добавление новой задачи
        saveTasks(); // Сохранение обновлённого списка задач
        taskInput.value = ''; // Очистка поля ввода
        renderTasks(); // Обновление отображаемого списка задач
    });

    renderTasks(); // Первое отображение задач при загрузке страницы
});