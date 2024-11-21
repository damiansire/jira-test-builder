import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edit, Plus } from 'lucide-react'
import { AITest } from "./types"

type AITestsProps = {
  aiTests: AITest[]
  onEditAITest: (test: AITest) => void
  onAddAITestToTask: (test: AITest) => void
}

export function AITests({ aiTests, onEditAITest, onAddAITestToTask }: AITestsProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tests IA</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)]">
          {aiTests.map(test => (
            <div key={test.id} className="mb-4 p-4 border rounded">
              <h3 className="font-bold">{test.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{test.description}</p>
              <ul className="list-disc pl-5">
                {test.steps.map((step, index) => (
                  <li key={index} className="text-sm">{step}</li>
                ))}
              </ul>
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={() => onEditAITest(test)} size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>
                <Button onClick={() => onAddAITestToTask(test)} size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Agregar a la tarea
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}