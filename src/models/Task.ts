class Task {
    public id: number;
    public title: string;
    public description: string;
    public startDate: Date;
    public deadline: Date;

    constructor(id: number, title: string, description: string, startDate: Date, deadline: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.deadline = deadline;
    }
}

export default Task;
