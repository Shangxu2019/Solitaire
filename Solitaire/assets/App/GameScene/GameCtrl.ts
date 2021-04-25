import GameDB from "./GameDB";
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
        //创建数据库
        this.m_gameDB = GameDB.creat();
        //初始化UI牌
        this.m_gameView.initPokers(this.m_gameDB.pokers);
        
    }

    public start():void{
     }
     
}