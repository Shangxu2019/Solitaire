
import View from "../../../GameFrameWork/MVC/View";
import UIUtil from "../../../GameFrameWork/Util/Util";
import { EPokerStatus } from "../../EnumConfig";
import UIPoker from "../../View/UIPoker/UIPoker";
import GameDB, { Poker } from "../GameDB";
import GameEvent from "../GameEvent";

const {ccclass, property} = cc._decorator;
@ccclass
export default class GameView extends View {
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

    private m_gameModel:GameDB = null;

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
    public bindModel(model:GameDB){
        this.m_gameModel = model;
        this.m_gameModel.on(GameEvent.INIT_POKER,this.onEventInit,this);
        this.m_gameModel.on(GameEvent.PLAY,this.onEventPlay,this);
        this.m_gameModel.on(GameEvent.INIT_GROUP_CARD,this.OnEventInitGroupCard,this);
        this.node.on(GameEvent.VM_POKER_MOVE_FROM_PLAYAREA_TO_RECEIVEAREA,this.m_gameModel.onEventPokerMoveFromPlayAreaToReceiveArea,this.m_gameModel);
    }
    public unBindModel(){
        this.m_gameModel.off(GameEvent.INIT_POKER,this.onEventInit,this);
        this.m_gameModel.off(GameEvent.PLAY,this.onEventPlay,this);
        this.m_gameModel.off(GameEvent.INIT_GROUP_CARD,this.onEventPlay,this);
        this.node.off(GameEvent.VM_POKER_MOVE_FROM_PLAYAREA_TO_RECEIVEAREA,this.m_gameModel.onEventPokerMoveFromPlayAreaToReceiveArea,this.m_gameModel);
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
        uiPoker.init(poker,this);
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
        UIUtil.transformNode(pokernode,this.PlayAreaRoot);
        
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
     /**
      * interface for UIPoker
      */
     public onClickUIPoker(uipoker:UIPoker){
        //1.这张牌在玩牌区
        //2.这张牌是翻开的
        //3.这张牌在最上方
        //4.这张牌的点数是A
        //-->这张牌可以移动到收牌区
        if(this.isLocationPlayArea(uipoker)){
            if(uipoker.isOpen()){
                if(this.isIndexPlayAreaGroupTop(uipoker)){
                    if(uipoker.isPoint(1)){
                        //UI不直接操作数据，而是发出操作数据的请求，交由数据库处理
                        this.node.emit(GameEvent.VM_POKER_MOVE_FROM_PLAYAREA_TO_RECEIVEAREA,uipoker.poker);
                    }
                }
            }
        }

     }
     private isLocationPlayArea(uipoker:UIPoker):boolean{
        return this.m_gameModel.isLocationPlayArea(uipoker.poker);
    }
    public isIndexPlayAreaGroupTop(uipoker:UIPoker):boolean{
        return this.m_gameModel.isIndexPlayAreaGroupTop(uipoker.poker);
    }
}
