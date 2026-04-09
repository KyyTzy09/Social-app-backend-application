export interface ReqUserType extends Request {
    user: {
        userId: string
    }
}

export interface IUserGoogleRequest {
    email: string;
    name: string;
    avatar: string
}