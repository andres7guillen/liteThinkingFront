import { Company } from "./company.model";

interface IArticle{
    id?: string;
    name?: string;
    companyNit?: string;
    company?: Company;
}

export class Article implements IArticle{
    id?: string;
    name?: string;
    companyNit?: string;
    company?: Company;
}