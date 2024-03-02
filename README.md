"content": "## samo_challenge

### Description
This TypeScript script solves the Water Jug Riddle problem using two jars with given capacities to measure a desired amount of water. The script defines functions to fill, empty, and transfer water between jars, checks for a solution based on the provided capacities and desired amount, and calculates the greatest common divisor to determine solvability.

### Installation
To install the necessary dependencies, run:
```bash
npm install express bodyParser
```

### Utilization
To solve the Water Jug Riddle problem, send a POST request with jar capacities and desired amount using `curl`:
```bash
curl -X POST http://localhost:3000/water-jug-riddle -H \"Content-Type: application/json\" --data '{\"X\": 20, \"Y\": 4, \"Z\": 12}'
```

### Contribution
- `solveWaterJugRiddle(X, Y, Z)`: Main function that solves the riddle by filling, emptying, and transferring water between jars based on given capacities and desired amount. It checks for solvability and uses an algorithm to determine the best approach.
- `isSolutionPossible()`: Checks if a solution is possible based on given jar capacities and desired amount.
- `solveWithInitialFill(jar1, jar2)`: Algorithmic function that iteratively fills, empties, or transfers water between jars to reach the desired amount.
- `gcd(a, b)`: Calculates the greatest common divisor of two numbers.
- Endpoint: Handles POST requests with jar capacities and desired amount, validates input, and sends the result as JSON response.

### Algorithmic Approach
The script uses an iterative approach to solve the Water Jug Riddle. It checks for edge cases and direct solutions, then determines the best approach to fill or transfer water between jars to reach the desired amount. The algorithm fills, empties, or transfers water based on jar capacities and the desired amount until a solution is found.

### Test Cases for Validation
1. Test Case: `{ X: 8, Y: 2, Z: 4 }`
   - Expected Outcome: Steps to fill Jar X with 5L, transfer 3L to Jar Y, and reach 4L in Jar Y.

2. Test Case: `{ X: 10, Y: 3, Z: 6 }`
   - Expected Outcome: Steps to fill Jar Y with 3L, transfer to Jar X, and reach 6L in Jar X.

3. Test Case: `{ X: 7, Y: 9, Z: 5 }`
   - Expected Outcome: No Solution message due to capacities not matching Z.

### Instruction
To run the program, compile the TypeScript script and then execute it using:
```bash
node dist/samo_challenge.js
```"

