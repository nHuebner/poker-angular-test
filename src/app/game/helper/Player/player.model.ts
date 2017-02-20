export class Player {
    public id: number;
    public name: string;
    public score?: number = 0;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class PlayerTexas extends Player {
    public hand?: any[] = [];
    public best?: any[] = [];
    public handName?: string = '';
    public flop?: number = 0;
    public river?: number = 0;
    public turn?: number = 0;

    constructor(id: number, name: string) {
        super(id, name);
    }
}

