import { randomUUID } from "node:crypto";

/** In-memory task store. Swap for a database later. */
export class TaskStore {
  #tasks = new Map();

  create({ title }) {
    const task = {
      id: randomUUID(),
      title,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.#tasks.set(task.id, task);
    return task;
  }

  get(id) {
    return this.#tasks.get(id) ?? null;
  }

  list() {
    return [...this.#tasks.values()];
  }

  update(id, changes) {
    const task = this.#tasks.get(id);
    if (!task) return null;
    Object.assign(task, changes);
    return task;
  }

  delete(id) {
    return this.#tasks.delete(id);
  }
}
