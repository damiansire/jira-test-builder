import { Task } from "@/components/jira-test-manager/types";
import { parse } from 'csv-parse/sync';

export const getJiraTask = async (): Promise<Task[]> => {
    const response = await fetch('input_secret_data/data_input.csv');
    const text = await response.text();
    const tasks = parse(text, {
        columns: false,
        skip_empty_lines: true,
    });

    const cleanComments = (selectedComment: string) => {
        //Delete Mentions
        let pattern = /\[~accountid:[^\]]*\]/g;
        let cleanComment = selectedComment.replace(pattern, "");

        //Delete imgs
        pattern = /![\w-]+\.png\|width=\d+,height=\d+,alt="[\w-]+\.png"/g;
        cleanComment = cleanComment.replace(pattern, "");

        return cleanComment;
    }

    const getComments = (task) => {
        const comments = [];
        for (let index = 10; index <= 35; index++) {
            if (task[index] != "") {
                const parsedComment = task[index].split(";")
                if (parsedComment.length > 1) {
                    const selectedComment = parsedComment.at(-1);
                    const clenaComment = cleanComments(selectedComment);
                    comments.push(clenaComment);
                }
            }
        }
        debugger
        return comments;
    }

    const jiraTasks: Task[] = tasks.slice(1).map(task => {
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

