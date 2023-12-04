import * as fs from "fs";
import * as readline from "readline";

function partOneSum(card: string[]): number {
  const winningNumbers: string[] = card[1].trim().split(/\s+/);
  const userNumbers: string[] = card[2].trim().split(/\s+/);
  let points = 0;

  for (let i = 0; i < userNumbers.length; ++i) {
    if (winningNumbers.indexOf(userNumbers[i]) != -1) {
      if (points == 0) {
        points = 1;
      } else {
        points *= 2;
      }
    }
  }

  return points;
}

function partOne() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-4/input-p1.txt"),
  });

  let sum = 0;

  readInterface.on("line", (line: string) => {
    const card: string[] = line.split(/[:\|]/);
    sum += partOneSum(card);
  });

  readInterface.on("close", () => {
    console.log("==========PART ONE==========");
    console.log("Sum of card points: " + sum);
  });
}

type Card = {
  Number: number,
  WinningNums: string[],
  UserNums: string[]
};

function parseCard(card: string[]): Card {
  const cardNum: number = parseInt(card[0].match(/\d+/).toString());
  const winningNums: string[] = card[1].trim().split(/\s+/);
  const userNums: string[] = card[2].trim().split(/\s+/);

  return { Number: cardNum, WinningNums: winningNums, UserNums: userNums };
}

function partTwoProcessCard(cards: Card[], currentCardIndex: number): number {
  const currentCard = cards[currentCardIndex];
  let extraCards = 0;
  let total = 1;
  
  for (let i = 0; i < currentCard.UserNums.length; ++i) {
    if (currentCard.WinningNums.indexOf(currentCard.UserNums[i]) != -1) {
      extraCards++;
      total++;
    }
  }

  for (let j = 1; j <= extraCards; ++j) {
    total--;
    total += partTwoProcessCard(cards, currentCardIndex + j);
  }

  return total;
}

function partTwo() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-4/input-p2.txt"),
  });

  const cards: Card[] = [];

  readInterface.on("line", (line: string) => {
    cards.push(parseCard(line.split(/[:\|]/)));
  });

  readInterface.on("close", () => {
    let total = 0;

    for (let i = 0; i < cards.length; ++i) {
      total += partTwoProcessCard(cards, i);
    }

    console.log("==========PART TWO==========");
    console.log("Total number of scratchcards: " + total);
  });
}

partOne();
partTwo();
