"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionsRepository_1 = require("../repositories/TransactionsRepository");
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, type = _a.type, value = _a.value;
        if (!['income', 'outcome'].includes(type)) {
            throw new Error('Transaction type is invalid');
        }
        var total = this.transactionsRepository.getBalance().total;
        if (type === TransactionsRepository_1.TransactionType.OUTCOME && total < value) {
            throw new Error('You do not have enough balance');
        }
        var transaction = this.transactionsRepository.create({ title: title, type: type, value: value });
        return transaction;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
