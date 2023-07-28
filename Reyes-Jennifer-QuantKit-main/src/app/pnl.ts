export class PNL {
    public id: number;
    public name: string;
    public time: Array<number>;
    public returns: Array<number>;
    
    constructor(id:number, name:string, time:Array<number>, returns:Array<number>){
        this.id = id;
        this.name = name;
        this.time = time;
        this.returns = returns;
    }
}