export enum NotifierState {
    None,
    Success,
    Info,
    Error
}

export class Notifier {
    public state: NotifierState;
    public title: string;
    public messages: string[]; 

    constructor() {
        this.state = NotifierState.None;
        this.title = null;
        this.messages = [];
    }

    public clear(): void {
        this.state = NotifierState.None;
        this.title = null;
        this.messages.length = 0;
    }

    public pushMessage(value: string): void {
        this.messages.push(value);
    }   
}