export type Comment = {
    content: string,
    author: string,
    images: string[],
    date: Date,
    pVote: string[],
    downVote: string[]
}

export type Post = {
    title: string, 
    content: string,
    author: string,
    tags: string[],
    images: string[],
    comments: Comment[],
    date: Date,
    upVote: string[],
    downVote: string[]
}