"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Task, Step, AITest, Test } from "./jira-test-manager/types"
import { TaskList } from "./jira-test-manager/task-list"
import { TaskDetails } from "./jira-test-manager/task-details"
import { NewTestForm } from "./jira-test-manager/new-test-form"
import { ExistingTests } from "./jira-test-manager/existing-tests"
import { AITests } from "./jira-test-manager/ai-test"
import { getJiraTask } from "@/services/data-handle"

export function JiraTestManager() {

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getJiraTask();
        setTasks(data); 
      } catch (error) {
        alert("Error al obtener las tareas");
        alert(error)
      }
    };

    fetchData();
  }, []);

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [aiTests] = useState<AITest[]>([
    {
      id: 1,
      title: "Test de inicio de sesión",
      description: "Verificar el proceso de inicio de sesión",
      steps: [
        "Navegar a la página de inicio de sesión",
        "Ingresar un nombre de usuario válido",
        "Ingresar una contraseña válida",
        "Hacer clic en el botón 'Iniciar sesión'",
        "Verificar que se redirige al dashboard"
      ]
    },
    {
      id: 2,
      title: "Test de registro de usuario",
      description: "Comprobar el proceso de registro de un nuevo usuario",
      steps: [
        "Navegar a la página de registro",
        "Completar todos los campos requeridos",
        "Aceptar los términos y condiciones",
        "Hacer clic en el botón 'Registrarse'",
        "Verificar que se crea la cuenta y se inicia sesión automáticamente"
      ]
    },
    {
      id: 3,
      title: "Test de recuperación de contraseña",
      description: "Verificar el proceso de recuperación de contraseña",
      steps: [
        "Navegar a la página de 'Olvidé mi contraseña'",
        "Ingresar el correo electrónico asociado a la cuenta",
        "Hacer clic en 'Enviar correo de recuperación'",
        "Verificar que se recibe el correo de recuperación",
        "Seguir el enlace de recuperación y establecer una nueva contraseña",
        "Intentar iniciar sesión con la nueva contraseña"
      ]
    }
  ])

  const tasksWithTests = tasks.filter(task => task.tests && task.tests.length > 0).length
  const totalTests = tasks.reduce((sum, task) => sum + (task.tests?.length || 0), 0)
  const progressPercentage = (tasksWithTests / tasks.length) * 100

  const handleEditAITest = (test: AITest) => {
    setActiveTab("newTest")
  }

  const handleAddAITestToTask = (aiTest: AITest) => {
    if (selectedTaskId) {
      const newTest: Test = {
        id: Date.now(),
        title: aiTest.title,
        description: aiTest.description,
        steps: aiTest.steps.map((step, index) => ({ id: index, description: step }))
      }
      setTasks(tasks.map(task => 
        task.id === selectedTaskId
          ? { ...task, tests: [...task.tests, newTest] }
          : task
      ))
    }
  }

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId)
    setActiveTab("details")
  }

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    ))
    setSelectedTaskId(null)
  }

  const handleCreateTest = (title: string, description: string, steps: Step[]) => {
    if (selectedTaskId) {
      setTasks(tasks.map(task => 
        task.id === selectedTaskId
          ? { ...task, tests: [...task.tests, { id: Date.now(), title, description, steps }] }
          : task
      ))
    }
  }

  const handleUpdateTest = (taskId: string, testId: number, updatedTest: Test) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, tests: task.tests.map(test => test.id === testId ? updatedTest : test) }
        : task
    ))
  }

  const handleDeleteTest = (taskId: string, testId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, tests: task.tests.filter(test => test.id !== testId) }
        : task
    ))
  }

  const selectedTask = tasks.find(task => task.id === selectedTaskId)

  return (
    <div className="h-screen flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold">Gestor de Tests para Tareas de Jira</h1>
      
      <div className="flex-grow flex space-x-4 overflow-hidden">

        <TaskList
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          onSelectTask={handleSelectTask}
        />

        <div className="flex-grow overflow-hidden">
          {selectedTask ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList>
                <TabsTrigger value="details">Detalles de la Tarea</TabsTrigger>
                <TabsTrigger value="newTest">Nuevo Test</TabsTrigger>
                <TabsTrigger value="existingTests">Tests Existentes</TabsTrigger>
                <TabsTrigger value="aiTests">Tests IA</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="flex-grow overflow-auto">
              <TaskDetails
                  task={selectedTask}
                  onCompleteTask={handleCompleteTask}
                  onAddTest={() => setActiveTab("newTest")}
                />
              </TabsContent>
              <TabsContent value="newTest" className="flex-grow overflow-auto">
              <NewTestForm onCreateTest={handleCreateTest} />
              </TabsContent>
              <TabsContent value="existingTests" className="flex-grow overflow-auto">
              <ExistingTests
                  tests={selectedTask.tests}
                  onUpdateTest={(testId, updatedTest) => handleUpdateTest(selectedTask.id, testId, updatedTest)}
                  onDeleteTest={(testId) => handleDeleteTest(selectedTask.id, testId)}
                />
              </TabsContent>
              <TabsContent value="aiTests" className="flex-grow overflow-auto">
              <AITests
                  aiTests={aiTests}
                  onEditAITest={handleEditAITest}
                  onAddAITestToTask={handleAddAITestToTask}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent>
                <p>Selecciona una tarea para ver sus detalles y gestionar sus tests.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progreso de Creación de Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="w-full" />
          <div className="flex justify-between mt-2">
            <p>Tareas con tests: {tasksWithTests} de {tasks.length}</p>
            <p>Total de tests creados: {totalTests}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}