import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExpenseFormProps {
  addExpense: (expense: { id: string; name: string; amount: number; category: string }) => void
}

export default function ExpenseForm({ addExpense }: ExpenseFormProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addExpense({
      id: Date.now().toString(),
      name,
      amount: Number.parseFloat(amount),
      category,
    })
    setName("")
    setAmount("")
    setCategory("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Expense name" required />
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Expense amount"
        step="0.01"
        min="0"
        required
      />
      <Select value={category} onValueChange={setCategory} required>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="housing">Housing</SelectItem>
          <SelectItem value="transportation">Transportation</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="utilities">Utilities</SelectItem>
          <SelectItem value="healthcare">Healthcare</SelectItem>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full">
        Add Expense
      </Button>
    </form>
  )
}

