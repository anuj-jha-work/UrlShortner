class ExpressError extends Error {
    message;
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
export { ExpressError };
// class ExpressError extends Error implements IExpressError {
//     statusCode: number;
//     message: string;
//     constructor(message: string, statusCode: number) {
//         super(message);
//         this.statusCode = statusCode;
//         this.message = message;
//     }
// }
