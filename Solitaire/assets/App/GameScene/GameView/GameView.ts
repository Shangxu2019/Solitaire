import { EPokerStatus } from "../../EnumConfig";
import UIPoker from "../../View/UIPoker/UIPoker";
import GameDB, { Poker } from "../GameDB";

const {ccclass, property} = cc._decorator;
@ccclass
export default class GameView extends cc.Component {
    //牌预制
    @property(cc.Prefab) pokerPrefab:cc.Prefab = null;
    //初始化牌
    @property(cc.Node) initPokerArea:cc.Node = null;
    //发牌
    @property(cc.Node) closeSendArea:cc.Node = null;
    //开牌
    @property(cc.Node) openSendArea:cc.Node = null;
    //收牌
    @property([cc.Node]) ReceiveAreaList:cc.Node[] = [];
    //玩牌
    @property(cc.Node) PlayAreaRoot:cc.Node = null;

    onLoad(){
        
    }
    start () {
    }
    Play(){
        let stack:cc.Node[] = [];
        let children = this.initPokerArea.children;

        for(let i = children.length-1;i>=0;--i){
            let child = children[i];
            stack.push(child);
            this.initPokerArea.removeChild(child);
        }
        for(let i = stack.length-1;i>=0;--i){
            this.closeSendArea.addChild(stack[i]);
        }
    }
    public initPokers(pokers:Poker[]){
        pokers.forEach((poker,index)=>{
            let uiPoker = this.creatUIPoker(poker);
            this.initPokerArea.addChild(uiPoker.node);
            uiPoker.node.x = 0.25*index;
            uiPoker.node.y = 0.25*index;
        });
    }
    creatUIPoker(poker:Poker):UIPoker{
        //创建UIPoker
        let uiPokerNode = cc.instantiate(this.pokerPrefab);
        let uiPoker = uiPokerNode.getComponent('UIPoker');
        uiPoker.init(poker);
        return uiPoker;
     }
     public onEventInit(pokers){
        this.initPokers(pokers);
     }
     public onEventPlay(){
         //数据驱动UI，通知view数据发生改变
        this.Play();
     }
     public OnEventInitGroupCard(cardIndex:number,groupIndex:number,poker:Poker){
        //先移动发牌区的牌到玩牌区
        let pokernode = poker.view.node;
        let wp = pokernode.convertToWorldSpaceAR(cc.v2(0,0));
        let pp = this.PlayAreaRoot.convertToNodeSpaceAR(wp);
        pokernode.removeFromParent();
        this.PlayAreaRoot.addChild(pokernode);
        pokernode.setPosition(pp);
        if(poker.status == EPokerStatus.OPEN){
            let act1 = cc.tween().delay(1*groupIndex);
            let act2 = cc.tween().to(0.5,{position: cc.v2(85*cardIndex, -30*groupIndex)});
            let act3 = cc.tween().to(0.2,{scaleX:0});
            let callFuc = cc.callFunc(()=>{
                poker.view.setStatus(poker.status);
            });
            let act4 = cc.tween().to(0.2,{scaleX:1});
            let act = cc.tween().sequence(act1,act2,act3,callFuc,act4);
            cc.tween(pokernode).then(act).start();
        }else{
            let act1 = cc.tween().delay(1*groupIndex);
            let act2 = cc.tween().to(0.5,{position: cc.v2(85*cardIndex, -30*groupIndex)});
            let act = cc.tween().sequence(act1,act2);
            cc.tween(pokernode).then(act).start();
        }
        

     }
}
