import TransactionsRepository, { TransactionType } from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: TransactionType;
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }
    const { total } = this.transactionsRepository.getBalance();
    if (type === TransactionType.OUTCOME && total < value) {
      throw new Error('You do not have enough balance');
    }
    const transaction = this.transactionsRepository.create({ title, type, value });
    return transaction;
  }
}

export default CreateTransactionService;
