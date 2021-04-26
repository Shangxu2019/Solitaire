import UIPoker from "../../View/UIPoker/UIPoker";
import { Poker } from "../GameDB";

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
    @property(cc.Node) PlayAreaAnchor:cc.Node = null;
    private PlayAreaOriginList:cc.Node[] = [];

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
     onEventInit(pokers){
        this.initPokers(pokers);
     }
     onEventPlay(){
         //数据驱动UI，通知view数据发生改变
        this.Play();
     }
}
