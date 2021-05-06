
import View from "../../../GameFrameWork/MVC/View";
import { EPokerStatus, ESuit } from "../../EnumConfig";
import { Poker } from "../../GameScene/GameDB";
import GameEvent from "../../GameScene/GameEvent";
import GameView from "../../GameScene/GameView/GameView";
const {ccclass, property} = cc._decorator;

const poker_Map = {
    '1':'A',
    '2':'2',
    '3':'3',
    '4':'4',
    '5':'5',
    '6':'6',
    '7':'7',
    '8':'8',
    '9':'9',
    '10':'10',
    '11':'J',
    '12':'Q',
    '13':'K',
}
@ccclass
export default class UIPoker extends View{
    @property(cc.Sprite)
    bgSprite:cc.Sprite = null;
    @property(cc.Sprite)
    smallSuitSprite:cc.Sprite = null;
    @property(cc.Sprite)
    bigSuitSprite:cc.Sprite = null;
    @property(cc.Label)
    pointLabel: cc.Label = null;

    @property(cc.SpriteFrame)
    pokerClosebg: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    pokerOpenbg: cc.SpriteFrame = null;

    @property([cc.SpriteFrame])
    smallSuits:cc.SpriteFrame[] = [];
    @property([cc.SpriteFrame])
    bigSuits:cc.SpriteFrame[] = [];
    @property([cc.SpriteFrame])
    bigExSuits:cc.SpriteFrame[] = [];
    private redPointLabel:cc.Color = cc.color(183,24,40);    
    private blackPointLabel:cc.Color = cc.Color.BLACK;

    private m_gameView:GameView = null;
    private _poker:Poker = null;
    public get poker(){ return this._poker;}
    start(){
        //注册触摸事件
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    public init(poker:Poker,view:GameView){
        this.m_gameView = view;
        this._poker = poker;
        poker.bind(this);
        this.pointLabel.string = `${poker_Map[poker.point]}`;
        this.pointLabel.node.color = (poker.suit == ESuit.FANGKUAI || poker.suit == ESuit.HONGXIN)?this.redPointLabel:this.blackPointLabel;
        this.smallSuitSprite.spriteFrame = this.smallSuits[poker.suit];
        if(poker.point<=10){
            this.bigSuitSprite.spriteFrame = this.bigSuits[poker.suit];
        }else{
            this.bigSuitSprite.spriteFrame = this.bigExSuits[poker.point-11];
        }
        this.setStatus(poker.status);
    }
    public setStatus(status:EPokerStatus){
        if(status ==  EPokerStatus.CLOSE){
            this.smallSuitSprite.node.active = false;
            this.bigSuitSprite.node.active = false;
            this.pointLabel.node.active = false;
            this.bgSprite.spriteFrame = this.pokerClosebg;
        }else{
            this.smallSuitSprite.node.active = true;
            this.bigSuitSprite.node.active = true;
            this.pointLabel.node.active = true;
            this.bgSprite.spriteFrame = this.pokerOpenbg;
        }
             
    }
    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    /***************************************************************************
    *event handle
    ****************************************************************************/
    onTouchStart(event){
        console.log("ontouch start")
    }
    onTouchMove(event){
        console.log("ontouch move")
    }
    onTouchEnd(event){
        // this.m_gameView.node.emit(GameEvent.CLICK_POKER,this._poker);
        //这里就不通过事件派发的方式来处理，直接通知UIpoker的老发gameview来处理，如果涉及到数据再交由model处理
        this.m_gameView.onClickUIPoker(this);
    }
    /**
     * interface for uipoker
     */

    public isOpen():boolean{
        return this._poker.status === EPokerStatus.OPEN;
    }

    public isPoint(point:number):boolean{
        return this._poker.point === point;
    }
    
}