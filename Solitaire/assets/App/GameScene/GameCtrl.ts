import GameView from "../View/GameView/GameView";
import Poker from "../View/Poker/Poker";
import UIPoker from "../View/Poker/UIPoker";
import GameDB from "./GameDB";

/*
游戏牌局管理者
*/
export default class GameCtrl{

    //构建数据库
    private m_gameDB:GameDB = null;
    //UI
    private m_gameView:GameView = null;
    public init(igameView:GameView){
        //创建数据库
        this.m_gameDB = GameDB.creat();
        this.m_gameView = igameView;
    }

    public start():void{
        this.m_gameView.creatPokers(this.m_gameDB.pokers);
     }
     
}