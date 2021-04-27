
/*
游戏牌局数据
*/

import EventManager from "../../GameFrameWork/Event/EventManager";
import Model from "../../GameFrameWork/MVC/Model";
import { EPokerStatus, ESuit } from "../EnumConfig";
import UIPoker from "../View/UIPoker/UIPoker";
import GameEvent from "./GameEvent";

//扑克数据结构
export class Poker{
    public get point(){return this._point;}
    public get suit(){return this._suit;}
    public get status(){return this._status;}
    public set status(statu){ this._status = statu;}
    public _point:number = -1; //点数
    public _suit:ESuit = ESuit.HEITAO;//花色
    public _status:EPokerStatus = EPokerStatus.CLOSE;//状态
    private _view:UIPoker = null;
    public get view(){return this._view;}
    constructor(ipoint?:number,isuit?:ESuit,istatus?:EPokerStatus){
        if(ipoint){ this._point = ipoint;}
        if(isuit){ this._suit = isuit ; }
        if(istatus){ this._status = istatus ; }
    }
    public bind(view:UIPoker){
        this._view = view;
    }
    public unBind(){
        this._view = null;
    }
}
export class PokerGroup{
    public get pokerGroup():Poker[]{ return this._pokerGroup;}
    private _pokerGroup:Poker[] = [];
    public addPoker(poker){
        this._pokerGroup.push(poker);
    }
}
export default class GameDB extends Model{
    /*************************************************************************
    *public static API
    **************************************************************************/
    public static readonly CONST_RECEIVE_POKERGROUP:number = 4;
    public static readonly CONST_PLAY_POKERGROUP:number = 7;
    /*************************************************************************
    *public API
    **************************************************************************/
    public Init(){
        //初始化牌局结构
        for(let i = 0;i<GameDB.CONST_RECEIVE_POKERGROUP;++i){
            let pokergroup = new PokerGroup();
            this._receiveAreaPokerGroup.push(pokergroup);
        }
        for(let i = 0;i<GameDB.CONST_PLAY_POKERGROUP;++i){
            let pokergroup = new PokerGroup();
            this._playAreaPokerGroup.push(pokergroup);
        }
        //初始化扑克
        for(let point = 1;point <= 13;point++){
            for(let suit = 0;suit <= 3;suit++){
                let poker = new Poker(point,suit,EPokerStatus.CLOSE);
                this._pokers.push(poker);
            }
        }
        //派发初始化牌局的事件
        this.emit(GameEvent.INIT_POKER,this._pokers);
    }
    public Play(){
        let temp = this._closeAreaPokers;
        this._closeAreaPokers = this._pokers;
        this._pokers = temp;
        //通知UI层发生变化
        this.emit(GameEvent.PLAY);
        //发牌
        for(let cards = GameDB.CONST_PLAY_POKERGROUP;cards>=1;--cards){
            for(let i = 0;i<cards;++i){
                let cardGroupIndex = GameDB.CONST_PLAY_POKERGROUP - cards + i;
                let cardGroup:PokerGroup = this._playAreaPokerGroup[cardGroupIndex];
                let poker = this._closeAreaPokers[this._closeAreaPokers.length - 1];
                this._closeAreaPokers.length = this._closeAreaPokers.length - 1;
                poker.status = i === 0?EPokerStatus.OPEN:EPokerStatus.CLOSE;
                cardGroup.addPoker(poker);
                //每一行的第一张牌要翻起来(按行发牌)
                this.emit(GameEvent.INIT_GROUP_CARD,cardGroupIndex,GameDB.CONST_PLAY_POKERGROUP-cards,poker);
            }
        }
    }

   /*************************************************************************
    *private API
    **************************************************************************/
    constructor(){
        super();
    }
   /*************************************************************************
    *getter & setter
    **************************************************************************/
    public get pokers():Poker[]{ return this._pokers;}
    public get closeAreaPokers():Poker[]{ return this._closeAreaPokers;}
    public get openAreaPokers():Poker[]{ return this._openAreaPokers;}
    public get receiveAreaPokerGroup():PokerGroup[]{ return this._receiveAreaPokerGroup;}
    public get playAreaPokerGroup():PokerGroup[]{ return this._playAreaPokerGroup;}
    /*************************************************************************
    *properrty
    **************************************************************************/
    //所有扑克的初始数据
    private _pokers:Poker[] = [];
    //发牌区盖着的扑克
    private _closeAreaPokers:Poker[] = [];
    //发牌区掀开着的扑克
    private _openAreaPokers:Poker[] = [];
    //收牌区组 4
    private _receiveAreaPokerGroup:PokerGroup[] = [];
    //玩牌区组 7
    private _playAreaPokerGroup:PokerGroup[] = [];
}
