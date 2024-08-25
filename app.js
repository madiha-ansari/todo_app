let input = document.getElementById("input");
let parent = document.getElementById("parent-li");


function add() {
    if (input.value.trim() === "") {
        Swal.fire({
            text: "Please write a task!",
            icon: "warning",
            confirmButtonColor: "#3085d6",
        });
    } else {
        let inputValue = input.value.trim();
        let li = document.createElement("li");
        li.className = "li";

        let textSpan = document.createElement("span");
        textSpan.className = "task-text";
        textSpan.innerText = inputValue;

        let buttonSpan = document.createElement("span");
        buttonSpan.className = "button-container";

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteBtn.className = "btnStyle1";
        deleteBtn.setAttribute("type", "button");
        deleteBtn.addEventListener("click", (event) => removelist(event));
        buttonSpan.appendChild(deleteBtn);

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
        editBtn.className = "btnStyle";
        editBtn.setAttribute("type", "button");
        editBtn.addEventListener("click", (event) => edit(event));
        buttonSpan.appendChild(editBtn);

        li.appendChild(textSpan);
        li.appendChild(buttonSpan);
        parent.appendChild(li);

        input.value = "";
        saveData();
    }
}

// Remove a task
function removelist(event) {
    event.target.closest("li").remove();
    saveData();
}

// Edit a task
function edit(event) {
    const li = event.target.closest("li");
    const taskText = li.querySelector(".task-text").innerText;

    Swal.fire({
        title: 'Update your task',
        input: 'text',
        inputLabel: 'Task',
        inputValue: taskText,
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value.trim()) {
                return 'You need to write something!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            li.querySelector(".task-text").innerText = result.value.trim();
            saveData();
        }
    });
}

// Delete all tasks
function dlt() {
    parent.innerHTML = "";
    saveData();
}

// Save the list to localStorage
function saveData() {
    localStorage.setItem("data", parent.innerHTML);
}

// Load the list from localStorage
function showTask() {
    parent.innerHTML = localStorage.getItem("data") || "";
    document.querySelectorAll(".btnStyle1").forEach(button => {
        button.addEventListener("click", (event) => removelist(event));
    });

    document.querySelectorAll(".btnStyle").forEach(button => {
        button.addEventListener("click", (event) => edit(event));
    });
}

showTask();