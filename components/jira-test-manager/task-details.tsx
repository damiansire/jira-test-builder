import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Task } from "./types"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import { parseDescription } from "@/lib/utils"

type TaskDetailsProps = {
  task: Task
  onCompleteTask: (taskId: string) => void
  onAddTest: () => void
}

export function TaskDetails({ task, onCompleteTask, onAddTest }: TaskDetailsProps) {
  const descriptionSections = parseDescription(task.description);


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {descriptionSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
              >
                {section.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {task.comments?.length > 0 ? <>
          <h3 className="font-semibold mb-2">Comentarios:</h3>

          {task.comments.map((comment) => (
            <div key={comment} className="mb-2 p-2 bg-secondary rounded">
              <p className="text-sm">{comment}</p>
            </div>
          ))}
        </> : ""
        }
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