import GameHeaderComponent from "../components/game-header.js";
import {render} from "../utils/render.js";

export default class GemaHeaderController {
  constructor(container, gameStatModel, gameController) {
    this._container = container;
    this._gameController = gameController;
    this._gameStatModel = gameStatModel;
    this._gameHeaderComponent = new GameHeaderComponent();
  }

  render() {
    render(this._container, this._gameHeaderComponent.getElement());
    this._gameHeaderComponent.setScore(this._gameStatModel.getScore());
    this._gameHeaderComponent.setNewGameBtnClickHandler(()=> {
      this._gameController.start();
    });
    this._gameStatModel.setScoreChangeHandler(()=>{
      this._gameHeaderComponent.setScore(this._gameStatModel.getScore());
    });
  }
}
