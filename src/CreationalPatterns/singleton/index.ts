// simple example
class Database {
    protected url: string;
    protected port: number;
    private static _instance: Database;

    private constructor(url: string, port: number) {
        this.url = url;
        this.port = port;
    }

    public static getInstance(url: string, port: number): Database {
        if (!this._instance) {
            this._instance = new Database(url, port);
        }
        return this._instance;
    }

    public getInfo(): string {
        return this.url;
    }
}

const database1 = Database.getInstance('localhost', 3444);
const database2 = Database.getInstance('new', 24);

console.log(database1.getInfo());
console.log(database2.getInfo());

