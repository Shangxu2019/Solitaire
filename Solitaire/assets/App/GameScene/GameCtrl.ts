import EventManager from "../../GameFrameWork/Event/EventManager";
import Ctrl from "../../GameFrameWork/MVC/Ctrl";
import GameDB from "./GameDB";
import GameEvent from "./GameEvent";
import GameView from "./GameView/GameView";

/*
游戏牌局管理者
*/
export default class GameCtrl extends Ctrl{

    //构建数据库
    private m_gameDB:GameDB = null;
    //UI
    private m_gameView:GameView = null;
    public init(igameView:GameView){
        this.m_gameView = igameView;
        //创建数据库
        this.m_gameDB = new GameDB();
        this.m_gameView.bindModel(this.m_gameDB);
        
        this.m_gameDB.Init();
    }

    public Play():void{
        //移动牌到发牌区
        this.m_gameDB.Play();
     }
     public Exit(){
        this.m_gameView.unBindModel();
     }
}