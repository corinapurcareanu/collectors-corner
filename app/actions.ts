"use server";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

let itemsFromBackend: Todo[] = [
  { id: "1", text: "Learn React", completed: false },
  { id: "2", text: "Build a todo app", completed: true },
  { id: "3", text: "Deploy to production", completed: false },
];

export async function getItems() {
  return itemsFromBackend;
}
export async function createItem(text: Todo["text"]) {
  itemsFromBackend.push({
    id: Date.now().toString(),
    text,
    completed: false,
  });
}

export async function deleteItem(id: Todo["id"]) {
  itemsFromBackend = itemsFromBackend.filter((item) => item.id !== id);
}

export async function markIncomplete(id: Todo["id"]) {
  const item = itemsFromBackend.find((item) => item.id === id);
  if (item) {
    item.completed = false;
  }
}

export async function markDone(id: Todo["id"]) {
  const item = itemsFromBackend.find((item) => item.id === id);
  if (item) {
    item.completed = true;
  }
}

export const updateItem = async (id: Todo["id"], text: Todo["text"]) => {
  const item = itemsFromBackend.find((item) => item.id === id);
  if (item) {
    item.text = text;
  }
}
