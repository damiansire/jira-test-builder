import { Task } from "@/components/jira-test-manager/types";
import { parse } from 'csv-parse/sync';

export const getJiraTask = async (): Promise<Task[]> => {
    const response = await fetch('input_secret_data/data_input.csv');
    const text = await response.text();
    const tasks = parse(text, {
        columns: false,
        skip_empty_lines: true,
    });

    const getComments = (task) => {
        const comments = [];
        for (let index = 10; index <= 35; index++) {
            if (task[index] != "") {
                const parsedComment = task[index].split(";")
                if (parsedComment.length > 1) {
                    comments.push(parsedComment.at(-1));
                }
            }
        }
        debugger
        return comments;
    }

    const jiraTasks: Task[] = tasks.map(task => {
        return {
            id: task[1],
            title: task[0],
            description: task[8],
            comments: getComments(task),
            tests: [],
            completed: false
        }
    })
    return jiraTasks;
}

