export type Step = {
    id: number
    description: string
}

export type Test = {
    id: number
    title: string
    description: string
    steps: Step[]
}

export type TaskComment = {
    id: number
    author: string
    content: string
    timestamp: string
}

export type Task = {
    id: string
    title: string
    description: string
    comments: TaskComment[]
    tests: Test[]
    completed: boolean
}

export type AITest = {
    id: number
    title: string
    description: string
    steps: string[]
}