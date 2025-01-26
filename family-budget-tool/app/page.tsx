"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import IncomeForm from "./components/IncomeForm"
import ExpenseForm from "./components/ExpenseForm"
import BudgetSummary from "./components/BudgetSummary"

interface Expense {
  id: string
  name: string
  amount: number
  category: string
}

export default function FamilyBudgetTool() {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    const savedIncome = localStorage.getItem("income")
    const savedExpenses = localStorage.getItem("expenses")

    if (savedIncome) setIncome(Number.parseFloat(savedIncome))
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses))
  }, [])

  useEffect(() => {
    localStorage.setItem("income", income.toString())
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [income, expenses])

  const addIncome = (amount: number) => {
    setIncome(amount)
  }

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense])
  }

  const resetBudget = () => {
    setIncome(0)
    setExpenses([])
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Family Budget Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Income</CardTitle>
            <CardDescription>Add your monthly income</CardDescription>
          </CardHeader>
          <CardContent>
            <IncomeForm addIncome={addIncome} currentIncome={income} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>Add your monthly expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseForm addExpense={addExpense} />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
          <CardDescription>Overview of your monthly budget</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetSummary income={income} expenses={expenses} />
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
        <Button onClick={resetBudget} variant="destructive">
          Reset Budget
        </Button>
      </div>
    </div>
  )
}

