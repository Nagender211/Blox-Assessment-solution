// JsonString to Object
const bigInt = require('bignumber.js');
console.log("JsonString to Object");

function parseJsonString(jsonString1) {

    console.log("Original JSON String:", jsonString1);

    return JSON.parse(jsonString1, (key, value) => {
       
        if (typeof value === 'string' && !isNaN(value)) {

            return new bigInt(value); 
        }

        return value;
    });
}

const jsonString1 = '{"name": "Alice", "age": 25, "bigNumber": "1234567890123456789012345678901234567890.12345678901234567890"}';
const parsedObject = parseJsonString(jsonString1);


console.log("Parsed Object:", parsedObject);

console.log("Arbitrary precision Number:", parsedObject.bigNumber.toFixed());



console.log("-----------------------Json String To List-------------------------");
const BigNumber = require('bignumber.js');

function parseJsonStringToList(jsonString) {
    return JSON.parse(jsonString, (key, value) => {
       
        if (typeof value === 'string' && !isNaN(value)) {
            return new BigNumber(value);
        }
        return value;
    });
}


let jsonString = '["1234567890123456789012345678901234567890", "apple", "banana", "3.1415926535897932384626433832795028841971"]';
const parsedList = parseJsonStringToList(jsonString);

console.log("Parsed List:", parsedList);

console.log("First item as BigNumber:", parsedList[0].toFixed()); 
console.log("Last item as BigNumber:", parsedList[3].toFixed()); 

