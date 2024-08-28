const divLeft = document.getElementById('div-left');
const divRight = document.getElementById('div-right');
const divTitleTasks = document.getElementById('div-title-tasks');
const divTitleTasksRight = document.getElementById('div-title-task-right');
const divDescriptionTask = document.getElementById('div-description-task');
const barProgress = document.getElementById('bar-progress');
const btnOpenMenu = document.getElementById('open-menu');
const btnOpenMenuTwo = document.getElementById('open-menu-two');
const menuAdd = document.getElementById('menu-add');
const addInputTitle = document.getElementById('add-input-title');
const addInputDescription = document.getElementById('add-input-description');
const btnAddTask = document.getElementById('btn-add-task');
const searchInput = document.getElementById('search');
const clearTasks = document.getElementById('btn-clear-tasks');
const checkProgress = document.getElementById('check-progress');

let tasks = [];

function showTasksRight(id, title, description, estate, progress) {
    divTitleTasksRight.innerHTML = '';
    divDescriptionTask.innerHTML = '';
    checkProgress.innerHTML = '';
    barProgress.innerHTML = '';

    const titleTaskRight = document.createElement('p');
    titleTaskRight.textContent = title;
    divTitleTasksRight.appendChild(titleTaskRight);

    const descriptionTask = document.createElement('p');
    descriptionTask.textContent = description;
    divDescriptionTask.appendChild(descriptionTask);

    const estateTask = document.createElement('p');
    estateTask.textContent = estate;
    divDescriptionTask.appendChild(estateTask);

    const progressColor = document.createElement('div');
    progressColor.id = 'progress-color';
    progressColor.style.backgroundColor = 'blue';
    progressColor.style.width = progress;

    barProgress.appendChild(progressColor);

    for (let i = 1; i <= 4; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = i;
        checkbox.checked = i <= (parseInt(progress) / 25);

        checkbox.addEventListener('click', function () {
            loadProgress(this.dataset.index, id);
        });

        checkProgress.appendChild(checkbox);
    }
}

function loadProgress(checkboxIndex, id) {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
        const totalCheckboxes = 4;
        const checkedCheckboxes = document.querySelectorAll(`#check-progress input:checked`).length;
        const progressPercentage = (checkedCheckboxes / totalCheckboxes) * 100;

        taskToUpdate.progress = `${progressPercentage}%`;
        showTasksRight(taskToUpdate.id, taskToUpdate.title, taskToUpdate.description, taskToUpdate.estate, taskToUpdate.progress);
    }
}

function showTasks() {
    divTitleTasks.innerHTML = '';

    tasks.forEach((resp) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const btnDelete = document.createElement('input');
        btnDelete.type = 'button';
        btnDelete.value = 'Delete';
        btnDelete.addEventListener('click', function () {
            Delete(resp.id);
        });

        checkbox.addEventListener('click', function () {
            checked(resp.id);
        });

        const pTitle = document.createElement('p');
        pTitle.textContent = `${resp.id} ${resp.title}`;

        checkbox.checked = resp.estate === 'true';

        divTitleTasks.appendChild(pTitle);
        divTitleTasks.appendChild(checkbox);
        divTitleTasks.appendChild(btnDelete);

        pTitle.addEventListener('click', function () {
            showTasksRight(resp.id, resp.title, resp.description, resp.estate, resp.progress);
        });
    });
}

btnOpenMenuTwo.addEventListener('click', menuOpen);
btnOpenMenu.addEventListener('click', menuOpen);

function menuOpen() {
    if (menuAdd.style.display === 'block') {
        menuAdd.style.display = 'none';
    } else {
        menuAdd.style.display = 'block';
    }
}

btnAddTask.addEventListener('click', function () {
    let id = tasks.length + 1;

    tasks.push({
        id: id,
        title: addInputTitle.value,
        description: addInputDescription.value,
        estate: 'false',
        progress: '0%'
    });

    showTasks();
});

function Delete(id) {
    tasks = tasks.filter(task => task.id !== id);
    showTasks();
    clearRightPanel();
}

function clearRightPanel() {
    divTitleTasksRight.innerHTML = '';
    divDescriptionTask.innerHTML = '';
    checkProgress.innerHTML = '';
    barProgress.innerHTML = '';
}

searchInput.addEventListener('input', function () {
    let searchInputValue = searchInput.value.toLowerCase();

    divTitleTasks.innerHTML = '';

    const filtrado = tasks.filter(task => task.title.toLowerCase().includes(searchInputValue));

    filtrado.forEach((resp) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const btnDelete = document.createElement('input');
        btnDelete.type = 'button';
        btnDelete.value = 'Delete';
        btnDelete.addEventListener('click', function () {
            Delete(resp.id);
        });

        checkbox.addEventListener('click', function () {
            checked(resp.id);
        });

        const pTitle = document.createElement('p');
        pTitle.textContent = `${resp.id} ${resp.title}`;

        checkbox.checked = resp.estate === 'true';

        divTitleTasks.appendChild(pTitle);
        divTitleTasks.appendChild(checkbox);
        divTitleTasks.appendChild(btnDelete);

        pTitle.addEventListener('click', function () {
            showTasksRight(resp.id, resp.title, resp.description, resp.estate, resp.progress);
        });
    });
});

function checked(id) {
    const taskToUpdate = tasks.find(task => task.id === id);

    if (taskToUpdate) {
        taskToUpdate.estate = taskToUpdate.estate === 'false' ? 'true' : 'false';
        taskToUpdate.progress = taskToUpdate.estate === 'true' ? '100%' : '0%';

        showTasks();
        showTasksRight(taskToUpdate.id, taskToUpdate.title, taskToUpdate.description, taskToUpdate.estate, taskToUpdate.progress);
    }
}

clearTasks.addEventListener('click', function () {
    tasks = [];
    showTasks();
    clearRightPanel();
});

showTasks();
