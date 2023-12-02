import * as fs from "fs";
import * as readline from "readline";

type Game = {
  ID: number,
  Red: number,
  Green: number,
  Blue: number,
};

// Change the max values depending on problem requirements
const maxValues: Game = {
  ID: 0,
  Red: 12,
  Green: 13,
  Blue: 14,
};

// Assumes simple, uniform format for input
function parseGame(line: string): Game {
  // Split input into sections for creation of Game object
  let sections = line.split(/[:,;]/);
  sections = sections.map((element: string) => { return element.trim(); });
  
  // Create game object
  const game: Game = { ID: 0, Red: 0, Green: 0, Blue: 0 };

  // Parse game ID
  game.ID = parseInt(sections[0].match(/\d+/).toString());

  // Parse max number of cubes for every colour
  for (let i = 1; i < sections.length; ++i) {
    let numCubes: number = 0;

    switch (true) {
      case /red/.test(sections[i]):
        numCubes = parseInt(sections[i].match(/\d+/).toString());
        if (numCubes > game.Red) {
          game.Red = numCubes;
        }

        break;
      case /green/.test(sections[i]):
        numCubes = parseInt(sections[i].match(/\d+/).toString());
        if (numCubes > game.Green) {
          game.Green = numCubes;
        }

        break;
      case /blue/.test(sections[i]):
        numCubes = parseInt(sections[i].match(/\d+/).toString());
        if (numCubes > game.Blue) {
          game.Blue = numCubes;
        }

        break;
    }
  }

  return game;
}

function partOne() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-2-cube-conundrum/input-p1.txt"),
  });

  let sumOfGameIDs = 0;

  readInterface.on("line", (line: string) => {
    const game: Game = parseGame(line);
    
    if (game.Red <= maxValues.Red &&
      game.Green <= maxValues.Green &&
      game.Blue <= maxValues.Blue) {
      sumOfGameIDs += game.ID;
    }
  });

  readInterface.on("close", () => {
    console.log("==========PART ONE==========");
    console.log("Sum of valid game IDs: " + sumOfGameIDs);
  });
}

function partTwo() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream("day-2-cube-conundrum/input-p2.txt"),
  });

  let sumOfPowers = 0;

  // Parsed game already shows maximum needed cubes so we don't need additional validation
  readInterface.on("line", (line: string) => {
    const game: Game = parseGame(line);
    sumOfPowers += (game.Red * game.Green * game.Blue);
  });

  readInterface.on("close", () => {
    console.log("==========PART TWO==========");
    console.log("Sum of game minimum powers: " + sumOfPowers);
  });
}

partOne();
partTwo();
