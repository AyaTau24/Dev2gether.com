const $ = s => document.querySelector(s);
const taskInput = $('#taskInput');
const addBtn = $('#addBtn');
const taskList = $('#taskList');
const totalEl = $('#total');
const doneEl = $('#done');
const progressBar = $('#progressBar');
const clearCompleted = $('#clearCompleted');
const clearAll = $('#clearAll');
const filters = document.querySelectorAll('.filter');

let tasks = [];
let filter = 'all';

function load(){
  const raw = localStorage.getItem('cartoonic_tasks');
  tasks = raw ? JSON.parse(raw) : [];
}

function save(){
  localStorage.setItem('cartoonic_tasks', JSON.stringify(tasks));
}

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}

function addTask(title){
  if(!title || !title.trim()) return;
  tasks.unshift({id:uid(), title:title.trim(), done:false, created: new Date().toISOString()});
  save();
  render();
}

function toggleDone(id){
  tasks = tasks.map(t => t.id === id ? {...t, done: !t.done} : t);
  save();
  render();
}

function removeTask(id){
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function clearCompletedTasks(){
  tasks = tasks.filter(t => !t.done);
  save();
  render();
}

function clearAllTasks(){
  if(!confirm('Clear all tasks?')) return;
  tasks = [];
  save();
  render();
}

function setFilter(f){
  filter = f;
  filters.forEach(b => b.classList.toggle('active', b.dataset.filter === f));
  render();
}

function updateStats(){
  const total = tasks.length;
  const doneCount = tasks.filter(t=>t.done).length;
  totalEl.textContent = total;
  doneEl.textContent = doneCount;
  const pct = total === 0 ? 0 : Math.round((doneCount/total)*100);
  progressBar.style.width = pct + '%';
}

function render(){
  taskList.innerHTML = '';
  let visible = tasks;
  if(filter === 'active') visible = tasks.filter(t => !t.done);
  if(filter === 'completed') visible = tasks.filter(t => t.done);

  visible.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-item' + (t.done ? ' done' : '');

    const cb = document.createElement('label');
    cb.className = 'checkbox';
    cb.innerHTML = `<div class="box-ui">${t.done ? '✅' : ''}</div>`;
    cb.addEventListener('click', ()=> toggleDone(t.id));

    const content = document.createElement('div');
    content.className = 'task-content';
    const title = document.createElement('p');
    title.className = 'task-title';
    title.textContent = t.title;
    title.contentEditable = true;
    title.addEventListener('blur', ()=>{
      const newText = title.textContent.trim();
      if(!newText) { removeTask(t.id); return; }
      tasks = tasks.map(x => x.id === t.id ? {...x, title:newText} : x);
      save();
      render();
    });

    const meta = document.createElement('div');
    meta.className = 'task-meta';
    const d = new Date(t.created);
    meta.textContent = `Added ${d.toLocaleString()}`;

    content.appendChild(title);
    content.appendChild(meta);

    const actions = document.createElement('div');
    const del = document.createElement('button');
    del.textContent = '🗑️';
    del.addEventListener('click', ()=> removeTask(t.id));
    actions.appendChild(del);

    li.appendChild(cb);
    li.appendChild(content);
    li.appendChild(actions);

    taskList.appendChild(li);
  });

  updateStats();
}

addBtn.addEventListener('click', ()=>{
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keydown', e=>{
  if(e.key === 'Enter'){
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

clearCompleted.addEventListener('click', clearCompletedTasks);
clearAll.addEventListener('click', clearAllTasks);
filters.forEach(b => b.addEventListener('click', ()=> setFilter(b.dataset.filter)));

load();
render();
