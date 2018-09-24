export interface Article {
    title: string,
    content: string
}

export interface Provider {
    (): Promise<Article>
}
