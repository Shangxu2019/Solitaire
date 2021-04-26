import EventManager from "../../GameFrameWork/Event/EventManager";
import GameDB from "./GameDB";
import GameEvent from "./GameEvent";
import GameView from "./GameView/GameView";

/*
游戏牌局管理者
*/
export default class GameCtrl{

    //构建数据库
    private m_gameDB:GameDB = null;
    //UI
    private m_gameView:GameView = null;
    public init(igameView:GameView){
        this.m_gameView = igameView;
        
        EventManager.getInstance().on(GameEvent.INIT_POKER,this.m_gameView.onEventInit,this.m_gameView);
        EventManager.getInstance().on(GameEvent.PLAY,this.m_gameView.onEventPlay,this.m_gameView);
        //创建数据库
        this.m_gameDB = GameDB.creat();
        
    }

    public start():void{
        //移动牌到发牌区
        this.m_gameDB.Play();
     }
     public Exit(){
        EventManager.getInstance().off(GameEvent.INIT_POKER,this.m_gameView.onEventInit,this.m_gameView);
        EventManager.getInstance().off(GameEvent.PLAY,this.m_gameView.onEventPlay,this.m_gameView);
     }
}