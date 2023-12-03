import * as fs from "fs";
import * as readline from "readline";

type PartNumber = {
  Num: string,
  isRelevant: boolean
}

function isRelevant(minCol: number, maxCol: number, row: number, matrix: string[][]): Boolean {
  const symbolRegex: RegExp = /[^A-Za-z0-9.]/

  for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, matrix.length - 1); ++i) {
    for (let j = Math.max(0, minCol - 1); j <= Math.min(maxCol + 1, matrix[i].length - 1); ++j) {
      if (symbolRegex.test(matrix[i][j])) {
        return true;
      }
    }
  }

  return false;
}

function parseEngineParts(matrix: string[][]): PartNumber[] {
  const partNums: PartNumber[] = [{Num: "", isRelevant: false}];
  
  for (let row = 0; row < matrix.length; ++row) {
    let minCol = 0;
    let maxCol = 0;
    let isMinColSet = false;
    let prevWasNum = false;

    for (let col = 0; col < matrix[row].length; ++col) {
      const currentChar = matrix[row][col];
      
      // Process latest collection of numbers if a non-number is encountered
      if (!(/\d/).test(currentChar)) {
        if (prevWasNum) {
          if (isRelevant(minCol, maxCol, row, matrix)) {
            partNums[partNums.length - 1].isRelevant = true;
          }
          
          partNums.push({Num: "", isRelevant: false});
          prevWasNum = false;
          isMinColSet = false;
        }

        continue;
      }

      // Otherwise add number to the current engine part

      prevWasNum = true;
      partNums[partNums.length - 1].Num += currentChar;

      if (isMinColSet) {
        maxCol = col;
      } else {
        minCol = col;
        maxCol = col;
        isMinColSet = true;
      }

      if (col == matrix[row].length - 1) {
        if (isRelevant(minCol, maxCol, row, matrix)) {
          partNums[partNums.length - 1].isRelevant = true;
        }
        
        partNums.push({Num: "", isRelevant: false});
      }
    }
  }

  return partNums;
}

function partOne() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-3/input-p1.txt"),
  });

  let matrix: string[][] = [];

  readInterface.on("line", (line: string) => {
    matrix.push(line.split(""));
  });

  readInterface.on("close", () => {
    const engineParts = parseEngineParts(matrix);
  
    let sum = 0;
    engineParts.forEach((value: PartNumber) => {
      if (value.isRelevant) {
        sum += parseInt(value.Num);
      }
    })

    console.log("==========PART ONE==========");
    console.log("Sum of engine parts: " + sum);
  });
}

function partTwo() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-3/input-p2.txt"),
  });

  let matrix: string[][] = [];

  readInterface.on("line", (line: string) => {
    matrix.push(line.split(""));
  });

  readInterface.on("close", () => {
    const engineParts = parseEngineParts(matrix);
    
    console.log("==========PART TWO==========");
    console.log("Sum of gear ratios: ");
  });
}

// partOne();
partTwo();
