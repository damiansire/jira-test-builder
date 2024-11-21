import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash } from 'lucide-react'
import { Step } from "./types"

type NewTestFormProps = {
  onCreateTest: (title: string, description: string, steps: Step[]) => void
}

export function NewTestForm({ onCreateTest }: NewTestFormProps) {
  const [newTestTitle, setNewTestTitle] = useState("")
  const [newTestDescription, setNewTestDescription] = useState("")
  const [newStep, setNewStep] = useState("")
  const [newTestSteps, setNewTestSteps] = useState<Step[]>([])
  const [editingStepId, setEditingStepId] = useState<number | null>(null)

  const addStep = () => {
    if (newStep.trim()) {
      setNewTestSteps([...newTestSteps, { id: Date.now(), description: newStep.trim() }])
      setNewStep("")
    }
  }

  const editStep = (id: number, newDescription: string) => {
    setNewTestSteps(newTestSteps.map(step =>
      step.id === id ? { ...step, description: newDescription } : step
    ))
    setEditingStepId(null)
  }

  const deleteStep = (id: number) => {
    setNewTestSteps(newTestSteps.filter(step => step.id !== id))
  }

  const handleCreateTest = () => {
    if (newTestTitle.trim() && newTestDescription.trim() && newTestSteps.length > 0) {
      onCreateTest(newTestTitle.trim(), newTestDescription.trim(), newTestSteps)
      setNewTestTitle("")
      setNewTestDescription("")
      setNewTestSteps([])
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Crear Nuevo Test</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Título del test"
          value={newTestTitle}
          onChange={(e) => setNewTestTitle(e.target.value)}
          className="mb-4"
        />
        <Textarea
          placeholder="Descripción del test"
          value={newTestDescription}
          onChange={(e) => setNewTestDescription(e.target.value)}
          className="mb-4"
        />
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Nuevo paso"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
          />
          <Button onClick={addStep} disabled={!newStep.trim()}>Agregar Paso</Button>
        </div>
        <ScrollArea className="h-[200px] mb-4">
          <ul className="list-disc pl-5">
            {newTestSteps.map((step) => (
              <li key={step.id} className="mb-2">
                {editingStepId === step.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      value={step.description}
                      onChange={(e) => editStep(step.id, e.target.value)}
                      onBlur={() => setEditingStepId(null)}
                      autoFocus
                    />
                    <Button onClick={() => setEditingStepId(null)} size="sm">Guardar</Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span>{step.description}</span>
                    <div>
                      <Button onClick={() => setEditingStepId(step.id)} size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => deleteStep(step.id)} size="sm" variant="ghost">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button onClick={handleCreateTest} disabled={!newTestTitle.trim() || !newTestDescription.trim() || newTestSteps.length === 0}>
          Crear Test
        </Button>
      </CardContent>
    </Card>
  )
}