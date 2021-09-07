/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data) {
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    }

    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            let auxiliary = self.hash;
            this.hash = SHA256(JSON.stringify(self)).toString();
            resolve(auxiliary == self.hash);
        });
    }

    /**
     *  Auxiliary Method to return the block body (decoding the data)
     *  Steps:
     *  
     *  1. Use hex2ascii module to decode the data
     *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
     *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block` 
     *     or Reject with an error.
     */
    getBData() {
        if (this.height == 0) { 
            return null;
        }
        let decodedData = hex2ascii(this.body);
        return JSON.parse(JSON.parse(decodedData)); //why 2??

        // Getting the encoded data saved in the Block
        // Decoding the data to retrieve the JSON representation of the object
        // Parse the data to an object to be retrieve.

        // Resolve with the data if the object isn't the Genesis block

    }

}

module.exports.Block = Block;                    // Exposing the Block class as a module