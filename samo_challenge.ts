/**
 * Solve the Water Jug Riddle problem using provided jar capacities
 * @param X Capacity of jar X
 * @param Y Capacity of jar Y
 * @param Z Desired amount of water to be measured
 * @returns Array of steps taken to solve the riddle or falsy value if no solution
 */

import express from 'express';
import bodyParser from 'body-parser';

// Define the structure of a jar
interface Jar {
  name: string;
  capacity: number;
  currentVolume: number;
}

const app = express();
app.use(bodyParser.json());

function solveWaterJugRiddle(X: number, Y: number, Z: number): any {

  // Initialize jars with given capacities
  const jarX: Jar = { name: 'Jar X', capacity: X, currentVolume: 0 };
  const jarY: Jar = { name: 'Jar Y', capacity: Y, currentVolume: 0 };

  // Array to store steps taken during solving the riddle
  const steps: string[] = [];

  // Function to fill a jar to its full capacity
  function fillJar(jar: Jar, newStep: number): number {
    steps.push(`Filling ${jar.name} with ${jar.capacity} liters...`);
    jar.currentVolume = jar.capacity;
    newStep++;
    return newStep;
  }

  // Function to empty a jar
  function emptyJar(jar: Jar, newStep: number): number {
    steps.push(`Emptying ${jar.name}...`);
    jar.currentVolume = 0;
    newStep++;
    return newStep;
  }

  // Function to transfer water between jars
  function transferWater(source: Jar, target: Jar, volumeToTransfer: number, newStep: number): number {
    steps.push(`Transferring water from ${source.name} to ${target.name} (${volumeToTransfer} liters)...`);
    source.currentVolume -= volumeToTransfer;
    target.currentVolume += volumeToTransfer;
    newStep++;
    return newStep;
  }

  // Function to check if a solution exists based on given jar capacities and desired amount
  function isSolutionPossible(): string[] | boolean {
    let stepsTaken = 0;

    // Check for both jars greater than disered
    if ( jarX.capacity > Z && jarY.capacity > Z) {
       steps.push(`No Solution>>>  ${jarX.name}: ${jarX.capacity}L > ${Z} && ${jarY.name}: ${jarY.capacity}L > ${Z}`);
       return steps;
    }

    let oneStep = jarX.capacity + jarY.capacity;

    // Check for sum of 02 jars are smaller than disered
    if ( oneStep < Z ) {
       steps.push(`No Solution>>>  ${jarX.name}: ${jarX.capacity}L + ${jarY.name}: ${jarY.capacity}L < ${Z}`);
       return steps;
    }

    // Check if single jar(X) capacity equals desired amount
    if ( jarX.capacity === Z ) {
       stepsTaken = fillJar(jarX, stepsTaken);
       steps.push(`Best Solution>>> #steps: ${stepsTaken}, ${jarX.name}: ${jarX.currentVolume}L, ${jarY.name}: ${jarY.currentVolume}L = Z Desired: ${Z}`);
       return steps;
    }

    // Check if single(Y) jar capacity equals desired amount
    if ( jarY.capacity === Z ) {
       stepsTaken = fillJar(jarY, stepsTaken);
       steps.push(`Best Solution>>> #steps: ${stepsTaken}, ${jarX.name}: ${jarX.currentVolume}L, ${jarY.name}: ${jarY.currentVolume}L = Z Desired: ${Z}`);
       return steps;
    }

    // Check for sum of 02 jars is iquals to the desired amount
    if (oneStep === Z) {
       stepsTaken = fillJar(jarX, stepsTaken);
       stepsTaken = fillJar(jarY, stepsTaken);
       steps.push(`Best Solution>>> #steps: ${stepsTaken}, ${jarX.name}: ${jarX.currentVolume}L, ${jarY.name}: ${jarY.currentVolume}L = Z Desired: ${Z}`);
       return steps;
    }

    // Check for edge cases where no solution exists
    if (Z % gcd(jarX.capacity, jarY.capacity) !== 0 || Z > Math.max(jarX.capacity, jarY.capacity)) {
         steps.push(`No Solution>>>  ${jarX.name}: ${jarX.capacity}L MDC ${Z} && ${jarY.name}: ${jarY.capacity}L REMAINDER>0 ${Z}`);
         return steps;
    }


    // Create temporary jars for calculation
    let tempJarX: Jar = { ...jarX };
    let tempJarY: Jar = { ...jarY };

    // Function to solve the riddle using initial fill
    function solveWithInitialFill(jar1: Jar, jar2: Jar): any {
      while (jar1.currentVolume !== Z && jar2.currentVolume !== Z) {
        if (jar1.currentVolume === 0) {
          stepsTaken = fillJar(jar1, stepsTaken);
        } else if (jar2.currentVolume === jar2.capacity) {
          stepsTaken = emptyJar(jar2, stepsTaken);
        } else {
          const spaceInY = jar2.capacity - jar2.currentVolume;
          const waterAvailableInX = jar1.currentVolume;
          const volumeToTransfer = Math.min(spaceInY, waterAvailableInX);
          stepsTaken = transferWater(jar1, jar2, volumeToTransfer, stepsTaken);
        }
      }

      steps.push(`Best Solution>>> #steps: ${stepsTaken}, ${jar1.name}: ${jar1.currentVolume}L, ${jar2.name}: ${jar2.currentVolume}L = Z Desired: ${Z}`);
    }

    // Decide which jar to fill first based on capacity
    if (tempJarX.capacity >= tempJarY.capacity) {
      solveWithInitialFill(tempJarX, tempJarY);
    } else {
      solveWithInitialFill(tempJarY, tempJarX);
    }

    return steps;
  }

  // Function to calculate the greatest common divisor of two numbers
  function gcd(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  return isSolutionPossible();
}

// Endpoint to receive POST request with jar capacities and desired amount
app.post('/water-jug-riddle', (req, res) => {
  const { X, Y, Z } = req.body;

  // Validate input parameters
  if (!X || !Y || !Z || X <= 0 || Y <= 0 || Z <= 0 || !Number.isInteger(X) || !Number.isInteger(Y) || !Number.isInteger(Z)) {
    return res.status(400).json({ error: 'Parameters X, Y, and Z are incorrect!' });
  }

  // Solve the Water Jug Riddle and send the result as JSON response
  const result = solveWaterJugRiddle(X, Y, Z);
  res.json({ steps: result });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
