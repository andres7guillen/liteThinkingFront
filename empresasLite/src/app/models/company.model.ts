import { Article } from "./article.model";

interface ICompany{
    nit?:string;
    name?: string;
    address?: string;
    phone?:string;
    articles?: Article[];
}

export class Company implements ICompany{
    nit?:string;
    name?: string;
    address?: string;
    phone?:string;
    articles?: Article[];
}