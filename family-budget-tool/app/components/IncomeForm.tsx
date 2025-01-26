import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface IncomeFormProps {
  addIncome: (amount: number) => void
  currentIncome: number
}

export default function IncomeForm({ addIncome, currentIncome }: IncomeFormProps) {
  const [income, setIncome] = useState(currentIncome.toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addIncome(Number.parseFloat(income))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        placeholder="Enter monthly income"
        step="0.01"
        min="0"
        required
      />
      <Button type="submit" className="w-full">
        Update Income
      </Button>
    </form>
  )
}

