export class Task{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public dueIn: number ,
        public dueDate?: Date) { }
}