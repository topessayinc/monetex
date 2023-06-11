const account = require('./account')
const deposit = require('./deposit')
const investment = require('./investment')
const referal = require('./referal')
const withdraw = require('./withdraw')
const deletedDeposit = require('./deleted.deposit')
const deletedWithdraw = require('./deleted.withdraw')
module.exports = {
    account, deposit, investment, referal, withdraw, deletedDeposit, deletedWithdraw
}