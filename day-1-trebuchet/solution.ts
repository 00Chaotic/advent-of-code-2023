import * as fs from "fs";
import * as readline from "readline";

function partOne(): void {
  console.log("==========PART ONE==========");

  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-1-trebuchet/input-p1.txt"),
  });

  let result = 0;

  readInterface.on("line", (line: string) => {
    const digits = line.match(/\d/g);

    result += parseInt(digits[0] + digits[digits.length - 1]);
  });

  readInterface.on("close", () => {
    console.log("Calibration value: " + result);
  });
}


// TODO: Current issue is that word numbers are not separated, so
// "zqmzgfivethreefdnlhpeight8798" incorrectly includes the "eight"
function partTwo(): void {
  console.log("==========PART TWO==========");

  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-1-trebuchet/input-p2.txt"),
  });

  let result = 0;
  const spelledOutNumberRegex = /(one|two|three|four|five|six|seven|eight|nine|zero)/g
  const spelledOutNumberMap = {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
  };

  const wordsToNumbers = (words: string): string | null => {
    words = words.toLowerCase();

    const matches = words.match(spelledOutNumberRegex);
    if (matches) {
      return matches.map((element: string) => { return spelledOutNumberMap[element]; }).join("");
    }
  };

  readInterface.on("line", (line: string) => {
    let countingDigits = false;
    let digits: string[] = [];
    let chars = "";

    for (let i = 0; i < line.length; ++i) {
      const char = line[i];

      // If a digit is encountered and letters were being counted so far,
      // process the letters in the queue, clear the queue and then add
      // the encountered digit to the queue.
      if (/\d/.test(char)) {
        if (!countingDigits) {
          const matches = wordsToNumbers(chars);
          if (matches) {
            digits.push(matches);
          }

          chars = "";
          countingDigits = true;
        }

        chars += char;
      } else { // Otherwise do the opposite
        if (countingDigits) {
          digits.push(chars);
          chars = "";
          countingDigits = false;
        }

        chars += char;
      }
    }

    // Process anything left in the queue at the end of the current line
    if (countingDigits) {
      digits.push(chars);
    } else {
      const matches = wordsToNumbers(chars);
      if (matches) {
        digits.push(matches);
      }
    }

    // Reset queue for next line
    chars = "";
    countingDigits = false;

    console.log("Digits: " + parseInt(digits[0] + digits[digits.length - 1]));

    result += parseInt(digits[0] + digits[digits.length - 1]);
  });

  readInterface.on("close", () => {
    console.log("Calibration value: " + result);
  });
}

// partOne();
partTwo();
