import Poker from "./Poker";

/*
游戏牌局管理者
*/
export default class GameCtrl{
    //扑克数据
    private pokers:Poker[] = [];
    public start():void{
        //初始化扑克
        for(let point = 1;point <= 13;point++){
            for(let suit = 0;suit <= 3;suit++){
                let poker = new Poker(point,suit);
                this.pokers.push(poker);
            }
        }
        console.log('GameCtrl:start');
        console.log(this.pokers);
     }
}