export class Post {
    private id: number;
    private title: string;
    private content: string;
    private date: Date;
    private likes: number;

    constructor(id: number, title: string, content: string, date: Date, likes: number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.likes = likes;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getContent(): string {
        return this.content;
    }

    public getDate(): Date {
        return this.date;
    }

    public getLikes(): number {
        return this.likes;
    }
}