// Store our call timestamps in an array
let callTimes = [];

// Are we currently in penalty time?
let isPenalized = false;
let penaltyEndTime = 0;

// Maximum calls allowed per minute
const MAX_CALLS = 15;

// Simple function to make an API call
async function makeAPICall(input) {
    const currentTime = Date.now();
    
    // Remove calls older than 1 minute
    callTimes = callTimes.filter(time => currentTime - time < 60000);

    // Check if we're in penalty
    if (isPenalized) {
        if (currentTime < penaltyEndTime) {
            console.log("Sorry, we're in penalty time. Please wait.");
            return null;
        }
        isPenalized = false;
    }

    // Check if we've made too many calls
    if (callTimes.length >= MAX_CALLS) {
        console.log("Too many calls! Going into penalty for 1 minute");
        isPenalized = true;
        penaltyEndTime = currentTime + 60000; // 1 minute penalty
        return null;
    }

    // Make the actual API call
    try {
        const result = await call_me(input);
        callTimes.push(currentTime);
        return result;
    } catch (error) {
        console.log("Oops, something went wrong!");
        return null;
    }
}

// This is our pretend API (just returns a message)
async function call_me(input) {
    return "API response for: " + input;
}

// Let's test it!
async function testAPICalls() {
    // Try to make 20 calls
    for (let i = 1; i <= 20; i++) {
        console.log(`Trying call number ${i}...`);
        
        const result = await makeAPICall("test " + i);
        
        if (result) {
            console.log(`Success: ${result}`);
        } else {
            console.log("Call failed or was blocked");
        }

        // Wait half a second before next call
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Run our test
testAPICalls();