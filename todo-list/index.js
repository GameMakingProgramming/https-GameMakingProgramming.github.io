 const form = document.getElementById("form");
 const input = document.getElementById("input");
 const ul = document.getElementById("ul");

 const todos = JSON.parse(localStorage.getItem("todos"));
 if (todos) {
    todos.forEach((todo) => {
        add(todo);
    });
 }

 form.addEventListener("submit", function (event) {
     event.preventDefault();
     add();
 });

 function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
    const lili = document.createElement("li");

    lili.innerText = todoText;
    lili.classList.add("list-group-item")

    if (todo && todo.completed) {
        lili.classList.add("text-decoration-line-through");
    }

    lili.addEventListener("contextmenu", function(event){
            event.preventDefault();
            lili.remove();
            saveData();
        });

        lili.addEventListener("click", function () {
            lili.classList.toggle("text-decoration-line-through");
            saveData();
        });

        console.log(lili);

    ul.appendChild(lili);
    input.value = "";
    saveData();
  }
 }

 function saveData() {
    const lists = document.querySelectorAll("li");
    const todos = [];

    lists.forEach((lili) => {
        todos.push({
            text: lili.innerText,
            completed: lili.classList.contains("text-decoration-line-through")
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}