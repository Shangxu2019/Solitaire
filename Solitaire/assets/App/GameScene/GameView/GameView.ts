import UIPoker from "../../View/UIPoker/UIPoker";
import GameDB, { Poker } from "../GameDB";

const {ccclass, property} = cc._decorator;
@ccclass
export default class GameView extends cc.Component {
    //牌预制
    @property(cc.Prefab) public pokerPrefab:cc.Prefab = null;
    //发牌
    @property(cc.Node) closeSendArea:cc.Node = null;
    //开牌
    @property(cc.Node) openSendArea:cc.Node = null;
    //收牌
    @property([cc.Node]) ReceiveAreaList:cc.Node[] = [];
    //玩牌
    @property(cc.Node) PlayAreaAnchor:cc.Node = null;
    private PlayAreaOriginList:cc.Node[] = [];
    private m_gameDB:GameDB = null;

    start () {

    }
    public initWithDB(gameDB:GameDB){
        this.m_gameDB = gameDB;
        this.m_gameDB.closeAreaPokers.forEach((poker,index)=>{
            let uiPoker = this.creatUIPoker(poker);
            this.closeSendArea.addChild(uiPoker.node);
            uiPoker.node.x = 0.5*index;
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
