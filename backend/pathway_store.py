import pathway as pw

class FinanceData(pw.Schema):
    amount: float
    category: str
    date: str

transactions = pw.Table(schema=FinanceData)

@pw.apply
def categorize(transaction: FinanceData) -> str:
    return f"Spent {transaction.amount} on {transaction.category}"

transactions.add_columns(summary=categorize)
