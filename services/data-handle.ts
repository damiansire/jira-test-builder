import { Task } from "@/components/jira-test-manager/types";
import { parse } from 'csv-parse/sync';

export const getJiraTask = async (): Promise<Task[]> => {
    const response = await fetch('input_secret_data/data_input.csv');
    const text = await response.text();
    const tasks = parse(text, {
        columns: true,
        skip_empty_lines: true,
    });
    const jiraTasks: Task[] = tasks.map(task => {
        return {
            id: task["Clave de incidencia"],
            title: task["Requirement Summary"],
            description: task["Descripción"],
            comments: [],
            tests: [],
            completed: false
        }
    })
    return jiraTasks;
}

