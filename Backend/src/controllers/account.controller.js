const accountModel = require("../models/account.model");
const userModel = require("../models/user.model");
const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const mongoose = require("mongoose");
const crypto = require("crypto");

const SYSTEM_USER_EMAIL = "system@ledger.internal";

/**
 * - Finds the internal "money supply" account used to fund deposits, or
 *   creates it (and its hidden system user) the first time it's needed.
 * - Nobody logs in as this user; it only exists so every deposit is still
 *   a real double-entry transfer (a DEBIT here, a CREDIT to the user).
 */
async function getOrCreateSystemAccount() {
    let systemUser = await userModel.findOne({ email: SYSTEM_USER_EMAIL }).select("+password +systemUser")

    if (!systemUser) {
        systemUser = await userModel.create({
            email: SYSTEM_USER_EMAIL,
            name: "System",
            password: crypto.randomBytes(24).toString("hex"),
            systemUser: true
        })
    }

    let systemAccount = await accountModel.findOne({ user: systemUser._id })

    if (!systemAccount) {
        systemAccount = await accountModel.create({ user: systemUser._id })
    }

    return systemAccount
}

/**
 * - POST /api/accounts/:accountId/add-funds
 * - Adds money to one of the logged-in user's own accounts.
 * - Protected Route
 */
async function addFundsController(req, res) {
    const { accountId } = req.params
    const { amount } = req.body

    if (!amount || amount <= 0) {
        return res.status(400).json({
            message: "A valid positive amount is required"
        })
    }

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    if (account.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Account must be ACTIVE to receive funds"
        })
    }

    const systemAccount = await getOrCreateSystemAccount()

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const idempotencyKey = `deposit-${accountId}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`

        const transaction = (await transactionModel.create([ {
            fromAccount: systemAccount._id,
            toAccount: account._id,
            amount,
            idempotencyKey,
            status: "PENDING"
        } ], { session }))[ 0 ]

        await ledgerModel.create([ {
            account: systemAccount._id,
            amount,
            transaction: transaction._id,
            type: "DEBIT"
        } ], { session })

        await ledgerModel.create([ {
            account: account._id,
            amount,
            transaction: transaction._id,
            type: "CREDIT"
        } ], { session })

        await transactionModel.findOneAndUpdate(
            { _id: transaction._id },
            { status: "COMPLETED" },
            { session }
        )

        await session.commitTransaction()
        session.endSession()

        const balance = await account.getBalance()

        return res.status(201).json({
            message: "Funds added successfully",
            accountId: account._id,
            balance,
            transaction
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()

        return res.status(500).json({
            message: "Could not add funds, please try again"
        })
    }
}

async function createAccountController(req, res) {

    const user = req.user;

    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        account
    })

}

async function getUserAccountsController(req, res) {

    const accounts = await accountModel.find({ user: req.user._id });

    res.status(200).json({
        accounts
    })
}

async function getAccountBalanceController(req, res) {
    const { accountId } = req.params;

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.getBalance();

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}


module.exports = {
    createAccountController,
    getUserAccountsController,
    getAccountBalanceController,
    addFundsController
}