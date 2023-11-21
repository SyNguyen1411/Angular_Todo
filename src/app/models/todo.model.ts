export class Todo{
    id!:number;
    content!: string;
    isComplete!: boolean;

    constructor(id:number, content:string){
        this.id = id;
        this.content = content;
        this.isComplete = false;
    }
}