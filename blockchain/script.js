// Install SHA256 hash node.js package by running:
// npm install --save crypto-js
// Import SHA256
const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        // this will calculate our hash
        this.hash = this.calculateHash();
        // Nonce belongs to proof of work method
        this.nonce = 0;
    }
    // this calculates the function of our block
    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + this.nonce + JSON.stringify(this.data)).toString();
    }
    // Proof of work methode
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block Mined: " + this.hash);
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }
    // This creates 1st block on blockchain
    createGenesisBlock(){
        return new Block(0, "01/01/2022", "Genesis block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const preiousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== preiousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let valCoin = new Blockchain();

console.log('Mining Block 1...');
valCoin.addBlock(new Block(1, "01/10/2022", { amount: 5 }));

console.log('Mining Block 2...');
valCoin.addBlock(new Block(2, "01/15/2022", { amount: 10 }));






// console.log(JSON.stringify(valCoin, null, 5));

// tampering with blockchain validity
// valCoin.chain[1].data = {amount: 99999999};

// valCoin.chain[1].hash = valCoin.chain[1].calculateHash();

// console.log("Blockchain Validity:  " + valCoin.isChainValid());

