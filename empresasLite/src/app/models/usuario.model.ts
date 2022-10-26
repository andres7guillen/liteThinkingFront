interface IUsuario{
    email?:string,
    PassWord?:string
}

export class Usuario implements IUsuario{
    email?:string;
    PassWord?:string;
}