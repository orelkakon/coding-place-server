export type Comment = {
    commentId: string,
    content: string,
    author: string,
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

export type User = {
    username: string,
    password: string,
    email: string,
    phone: string
}