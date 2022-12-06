export type Comment = {
    content: string,
    author: string,
    images: string[],
    date: Date,
    marked: boolean 
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
    downVote: string[],
    closed: boolean
}