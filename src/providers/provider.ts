export interface IArticle {
    title: string;
    content: string;
}

export type IProvider = () => Promise<IArticle>;
