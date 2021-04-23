import Poker from "./Poker";
import UIPoker from "./UIPoker";

/*
游戏牌局管理者
*/
export default class GameCtrl{
    //扑克数据
    private pokers:Poker[] = [];
    private pokerPrefab:cc.Prefab = null;
    private pokerContainer:cc.Node = null;
    public init(ipokerprefab:cc.Prefab,ipokerContainer:cc.Node){
        this.pokerPrefab = ipokerprefab;
        this.pokerContainer = ipokerContainer;
    }
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
        this.pokers.forEach(poker=>{
            let uiPoker = this.creatUIPoker(poker);
            this.pokerContainer.addChild(uiPoker.node);
            uiPoker.node.setPosition(Math.random()*500,Math.random()*500);
        });
     }
     creatUIPoker(poker:Poker):UIPoker{
        //创建UIPoker
        let uiPokerNode = cc.instantiate(this.pokerPrefab);
        let uiPoker = uiPokerNode.getComponent('UIPoker');
        uiPoker.init(poker);
        return uiPoker;
     }
}