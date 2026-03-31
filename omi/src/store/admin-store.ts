/** Admin page store. */
export interface AdminStore {
  name: string;
  rename(name: string): void;
}

const store: AdminStore = {
  name: 'I am admin page',
  rename(name: string): void {
    this.name = name;
  },
};

export default store;
