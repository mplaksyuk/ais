const fs = require('fs');
const { getPrime, hashHelper, getRandomElement } = require('./functions');
const SecondaryHashTable = require('./SecondaryHashTable.js');

const re = /^(?:(?<real>[-]?\d+(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?)\+?(?<imaginary>(?:(?:|\-)\d+)(?:(?:\.\d+)?(?:e[+\-]\d+)?)?)?[iI]$/;

const jtos = function() {
    for (var key in object) {
        // skip loop if the property is from prototype
        if (!object.hasOwnProperty(key)) continue;
    
        var obj = object[key];
        for (var prop in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(prop)) continue;
    
            // your code
            alert(prop + " = " + obj[prop]);
        }
    }
}

class HashTable {
    constructor(values) {
        this.hashes = new Array(values.length); //m
        this.p = getPrime(this.hashes.length ** 2);
        this.a = getRandomElement(this.p);
        this.b = getRandomElement(this.p);

        //Remove duplicates
        [...new Set(values.map(JSON.stringify))].map(JSON.parse).forEach(value => this.hash(value));

        //Create secondHashTable for all collisions
        this.hashes = this.hashes.map(hashedArray => {
            if (hashedArray === undefined) return null;
            return hashedArray.length > 1
                ? new SecondaryHashTable(this.p, hashedArray)
                : hashedArray;
        }
        )
    }

    hash(value) {
        hashHelper(value, this.a, this.b, this.p, this.hashes);
    }

    showTable() {
        this.hashes.forEach((hash, index) => {
            if (hash instanceof SecondaryHashTable) {
                console.log(`${index}: ${hash.print(index)}`);
            } else if (hash) {
                console.log(`${index}: a${index} = 0 \tb${index} = 0\t S${index}=${JSON.stringify(JSON.parse(JSON.stringify(hash[0])))}`);
            }
        })
    }
}

const reg = function(str) {
    var values = re.exec(str);
    return {real: values[1], imaginary: values[2] };
}

const main = () => {
    try {
        const data = fs.readFileSync(__dirname + '/text.txt', 'utf8');
        const arrayOfNumbers = data.split('\n').filter(el => el !== '').map(val => reg(val));
        console.log(arrayOfNumbers);
        const hashTable = new HashTable(arrayOfNumbers);
        hashTable.showTable();
    } catch (err) {
        console.error(err);
    }
}

main()


