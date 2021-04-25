import GameView from "../View/GameView/GameView";
import Poker from "../View/Poker/Poker";
import UIPoker from "../View/Poker/UIPoker";

/*
游戏牌局管理者
*/
export default class GameCtrl{
    //扑克数据
    private pokers:Poker[] = [];
    //UI
    private m_gameView:GameView = null;
    public init(igameView:GameView){
        this.m_gameView = igameView;
    }

    public start():void{
        //初始化扑克
        for(let point = 1;point <= 13;point++){
            for(let suit = 0;suit <= 3;suit++){
                let poker = new Poker(point,suit);
                this.pokers.push(poker);
            }
        }
        this.m_gameView.creatPokers(this.pokers);
        
     }
     
}