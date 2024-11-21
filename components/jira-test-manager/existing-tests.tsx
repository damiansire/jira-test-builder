import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash } from 'lucide-react'
import { Test } from "./types"

type ExistingTestsProps = {
  tests: Test[]
  onUpdateTest: (testId: number, updatedTest: Test) => void
  onDeleteTest: (testId: number) => void
}

export function ExistingTests({ tests, onUpdateTest, onDeleteTest }: ExistingTestsProps) {
  const [editingTestId, setEditingTestId] = useState<number | null>(null)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tests Existentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)]">
          {tests.map(test => (
            <div key={test.id} className="mb-4 p-4 border rounded">
              {editingTestId === test.id ? (
                <div>
                  <Input
                    value={test.title}
                    onChange={(e) => onUpdateTest(test.id, {...test, title: e.target.value})}
                    className="mb-2"
                  />
                  <Textarea
                    value={test.description}
                    onChange={(e) => onUpdateTest(test.id, {...test, description: e.target.value})}
                    className="mb-2"
                  />
                  {test.steps.map((step, index) => (
                    <Input
                      key={step.id}
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...test.steps];
                        newSteps[index] = {...newSteps[index], description: e.target.value};
                        onUpdateTest(test.id, {...test, steps: newSteps});
                      }}
                      className="mb-2"
                    />
                  ))}
                  <Button onClick={() => setEditingTestId(null)} className="mt-2">Guardar</Button>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold">{test.title}</h3>
                  <p>{test.description}</p>
                  <ul className="list-disc pl-5 mt-2">
                    {test.steps.map((step) => (
                      <li key={step.id}>{step.description}</li>
                    ))}
                  </ul>
                  <div className="mt-2 space-x-2">
                    <Button onClick={() => setEditingTestId(test.id)} size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button onClick={() => onDeleteTest(test.id)} size="sm" variant="destructive">
                      <Trash className="mr-2 h-4 w-4" /> Eliminar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}