import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Task } from "./types"

type TaskListProps = {
  tasks: Task[]
  selectedTaskId: string | null
  onSelectTask: (taskId: string) => void
}

export function TaskList({ tasks, selectedTaskId, onSelectTask }: TaskListProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Lista de Tareas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          {tasks.filter(task => !task.completed).map(task => (
            <Card
              key={task.id}
              className={`mb-2 cursor-pointer transition-colors ${selectedTaskId === task.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
              onClick={() => onSelectTask(task.id)}
            >
              <CardContent className="p-2">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-xs">Tests: {task.tests?.length}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}