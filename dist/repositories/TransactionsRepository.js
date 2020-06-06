"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionType;
(function (TransactionType) {
    TransactionType["INCOME"] = "income";
    TransactionType["OUTCOME"] = "outcome";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var _a = this.transactions.reduce(function (acc, transaction) {
            switch (transaction.type) {
                case TransactionType.INCOME:
                    acc.income += transaction.value;
                    break;
                case TransactionType.OUTCOME:
                    acc.outcome += transaction.value;
                    break;
                default:
                    break;
            }
            return acc;
        }, {
            income: 0,
            outcome: 0,
            total: 0
        }), income = _a.income, outcome = _a.outcome;
        var total = income - outcome;
        return { income: income, outcome: outcome, total: total };
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, type = _a.type, value = _a.value;
        var transaction = new Transaction_1.default({ title: title, type: type, value: value });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
