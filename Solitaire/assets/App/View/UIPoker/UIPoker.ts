
import { EPokerStatus, ESuit } from "../../EnumConfig";
import { Poker } from "../../GameScene/GameDB";
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
export default class UIPoker extends cc.Component{
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

    

    public init(poker:Poker){
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
    private setStatus(status:EPokerStatus){
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
}