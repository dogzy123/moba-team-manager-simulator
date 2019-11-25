import {SKILL, MEDIA, RESPECT, TEAM_PLAY, TOXICITY} from './constants';

const lowReducer = (param) => {
  switch (param) {
    case SKILL:
      return [3, 10];
    case TOXICITY:
      return [75, 100];
    case TEAM_PLAY:
      return [1, 5];
    case RESPECT:
      return [1, 2];
    case MEDIA:
      return [1, 3];

    default:
      return [1, 1];
  }
};

const mediumReducer = (param) => {
  switch (param) {
    case SKILL:
      return [10, 20];
    case TOXICITY:
      return [45, 75];
    case TEAM_PLAY:
      return [5, 15];
    case RESPECT:
      return [5, 10];
    case MEDIA:
      return [2, 6];

    default:
      return [1, 1];
  }
};

const highReducer = (param) => {
  switch (param) {
    case SKILL:
      return [25, 35];
    case TOXICITY:
      return [25, 55];
    case TEAM_PLAY:
      return [12, 25];
    case RESPECT:
      return [10, 20];
    case MEDIA:
      return [5, 10];

    default:
      return [1, 1];
  }
};

export default function generatePlayers() {
  const generateParam = ([min, max]) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateConfig = (reducer) => {
    const config = {};

    [SKILL, TOXICITY, TEAM_PLAY, RESPECT, MEDIA].forEach(param => config[param] = generateParam(reducer(param)));

    return config;
  };

  const strongPlayers = 10;
  const mediumPlayers = 25;
  const lowPlayers = 65;

  const players = [];

  for (let lowIndex = 0; lowIndex < lowPlayers; lowIndex++)
  {
    players.push( generateConfig(lowReducer) );
  }

  for (let mediumIndex = 0; mediumIndex < mediumPlayers; mediumIndex++)
  {
    players.push( generateConfig(mediumReducer) );
  }

  for (let highIndex = 0; highIndex < strongPlayers; highIndex++)
  {
    players.push( generateConfig(highReducer) );
  }

  return players;
}