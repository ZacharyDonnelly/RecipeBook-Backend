export declare const authValidation: (req: {
    headers: {
        [x: string]: any;
    };
    body: {
        email: string;
        headers: any;
    };
}, res: {
    status: (arg0: number) => void;
    send: (arg0: string) => void;
    locals: any;
}, next: () => void) => void;
