let progressBar = document.getElementById('progress-bar');
let progressInput = document.getElementById('progress-input');
let taskNameInput = document.getElementById('task-name');
let setBtn = document.getElementById('set-progress');
let increaseBtn = document.getElementById('increase-progress');

function updateProgress(value) {
    let taskName = taskNameInput.value.trim() || "Unnamed Task";
    
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    progressBar.style.width = value + '%';
    progressBar.textContent = `${taskName} - ${value}%`;
}

// Set progress from input
setBtn.addEventListener('click', () => {
    let value = parseInt(progressInput.value, 10);
    if (!isNaN(value)) {
        updateProgress(value);
    }
});

// Increase progress by 10%
increaseBtn.addEventListener('click', () => {
    let current = parseInt(progressBar.textContent.split('-')[1], 10) || 0;
    updateProgress(current + 10);
});
