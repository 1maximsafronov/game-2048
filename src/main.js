import GameController from "./controllers/game.js";
import GameHeaderControllers from "./controllers/game-header.js";
import GameStatModel from "./models/game-stat.js";

const bodyContainer = document.querySelector(`body`);

const gameStatModel = new GameStatModel();

const gameController = new GameController(bodyContainer, gameStatModel);
const gameHeaderComponent = new GameHeaderControllers(bodyContainer, gameStatModel, gameController);

gameHeaderComponent.render();
gameController.render();
gameController.start();
