import { getTodoInput } from "./helpers.js";
import Todo from "./model/todo.js";
import todoStorage from "./model/todoStorage.js";

function addTodoHandler(doc) {
  console.log("Add button clicked");
  const todoTextInput = getTodoInput(doc);
  todoStorage.save(new Todo(todoTextInput.value));
  todoTextInput.value = "";

  const todoItemCreated = new Event("todo-item-created");
  doc.dispatchEvent(todoItemCreated);
}

function clearFormHandler(doc) {
  console.log("Clear button clicked");
  const todoTextInput = getTodoInput(doc);
  todoTextInput.value = "";
}

function updateTotalTodoCount(doc) {
  console.log("Updating Total Todo Count");

  const h2 = doc.getElementById("todo-counter");
  h2.innerHTML = `Total Todo Count: ${todoStorage.totalTodoCount()}`;
}

function createTodoElement(doc, todo) {
  const todoItem = doc.createElement("div");
  todoItem.className = "item";
  todoItem.innerHTML = JSON.stringify(todo);

  return todoItem;
}

function updateTodoList(doc) {
  console.log("Updating Todo List");

  const todoListElement = doc.querySelector(".todo-list");
  //todoListElement.innerHTML = "";
  todoListElement.querySelectorAll("*").forEach((n) => n.remove());

  todoStorage.getAllTodo().forEach((todo) => {
    const todoElement = createTodoElement(doc, todo);
    todoListElement.append(todoElement);
  });
}

function setupEventListenerByName(doc, elementId, eventName, handler) {
  const element = doc.getElementById(elementId);
  element.addEventListener(eventName, handler);
}

function setupEventListener(element, eventName, handler) {
  element.addEventListener(eventName, handler);
}

function describeEventListeners(doc) {
  return [
    {
      elementId: "add-todo-button",
      eventName: "click",
      handler: addTodoHandler.bind(null, doc),
    },
    {
      elementId: "clear-form-button",
      eventName: "click",
      handler: clearFormHandler.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: updateTotalTodoCount.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: updateTodoList.bind(null, doc),
    },
  ];
}

export function setupEventListeners(doc) {
  console.log("Setting up event listeners");

  describeEventListeners(doc).forEach((h) => {
    if (h.element === undefined) {
      setupEventListenerByName(doc, h.elementId, h.eventName, h.handler);
    } else {
      setupEventListener(h.element, h.eventName, h.handler);
    }
  });
}
