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
        //创建数据库
        this.m_gameDB = GameDB.creat();
        this.m_gameView = igameView;
    }

    public start():void{
        this.m_gameView.initWithDB(this.m_gameDB);
     }
     
}