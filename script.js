const newTaskForm = document.getElementById('new-task-form');
const tasksList = document.getElementById('tasks-list');

let tasks = [];

//Limpar o histórico da lista, para evitar duplicação de itens
const clearList = () => {
  const children = [...tasksList.children];
  children.forEach((child) => {
    tasksList.removeChild(child);
  })
}

//Atualizar a lista exibida
const updateList = () => {
  clearList();

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.title;

    //Criar um botão para deletar o item da lista
    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'Delete';
    buttonDelete.onclick = () => {
      handleButtonDeleteClick(task);
    }
    listItem.appendChild(buttonDelete);

    //Criar um checkbox para alterar o item da lista
    const checkboxIsDone = document.createElement('input');
    checkboxIsDone.setAttribute('type', 'checkbox');
    checkboxIsDone.checked = task.isDone;
    checkboxIsDone.onchange = () => {
      handleCheckboxChange(task);
    }
    listItem.appendChild(checkboxIsDone);

    tasksList.appendChild(listItem);
  })
}

//Carregar o local storage
const loadFromLocalStorage = () => {
  const saveData = localStorage.getItem('tasks');

  if(saveData === null) {
    return;
  }

  const parsedData = JSON.parse(saveData);
  tasks = parsedData;

  updateList();
}

loadFromLocalStorage();

//Salvar lista no local storage
const saveToLocalStorage = () => {
  const parsedData = JSON.stringify(tasks);
  localStorage.setItem('tasks', parsedData);
}

//Deletar o item da lista criada
const handleButtonDeleteClick = (targeTask) => {
  const filtered = tasks.filter((element) => {
    return element != targeTask;
  })
  tasks = filtered;
  saveToLocalStorage();
  updateList();
}

//Atualizar o item da lista ao clicar no checkbox
const handleCheckboxChange = (targeTask) => {
  targeTask.isDone = !targeTask.isDone;
  //Funciona porque é uma boleana (true ou false)
  saveToLocalStorage();
  updateList();
}

//Ler as informações inseridas e criar um array
const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(newTaskForm);
  const formEntries = Object.fromEntries(formData);

  const newTask = {
    id: tasks.length,
    title: formEntries.title,
    description: formEntries.description,
    isDone: false
  }
  tasks.push(newTask);
  saveToLocalStorage();
  updateList();
}

newTaskForm.addEventListener('submit', handleSubmit);
