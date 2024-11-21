import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Task } from "./types"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'

type TaskDetailsProps = {
  task: Task
  onCompleteTask: (taskId: string) => void
  onAddTest: () => void
}

export function TaskDetails({ task, onCompleteTask, onAddTest }: TaskDetailsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
        >
          {task.description}
        </ReactMarkdown>
        <h3 className="font-semibold mb-2">Comentarios:</h3>
        <ScrollArea className="h-[200px] mb-4">
          {task.comments.map((comment) => (
            <div key={comment} className="mb-2 p-2 bg-secondary rounded">
              <p className="text-sm">{comment}</p>
            </div>
          ))}
        </ScrollArea>
        <Button
          className="mt-4"
          onClick={() => {
            if (task.tests.length === 0) {
              onAddTest()
            } else {
              onCompleteTask(task.id)
            }
          }}
        >
          {task.tests.length === 0 ? 'Agregar tests para completar' : 'Completar Tarea'}
        </Button>
      </CardContent>
    </Card>
  )
}