// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(
        address from,
        address to,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address from;
        address to;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;

        transactions.push(
            TransferStruct({
                from: msg.sender,
                to: receiver,
                amount: amount,
                message: message,
                timestamp: block.timestamp,
                keyword: keyword
            })
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransaction() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
