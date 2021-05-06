
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
    *constructor
    **************************************************************************/
    constructor(){
        super();
    }
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
        //洗牌
        this.shuffle(this._closeAreaPokers,1000);
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
    
    private shuffle(pokers:Poker[],count:number = 100){
        for(let i = 0;i<count;++i){
            let startIndex = parseInt('' + Math.random()*pokers.length,10);
            let endIndex = parseInt('' + Math.random()*pokers.length,10);
            let temp = pokers[startIndex];
            pokers[startIndex] = pokers[endIndex];
            pokers[endIndex] = temp;
        }
    }
    public onEventPokerMoveFromPlayAreaToReceiveArea(poker:Poker){
        console.log(`GameDB:onEventPokerMoveFromPlayAreaToReceiveArea ${poker}`);
    }
    public isLocationPlayArea(poker:Poker):boolean{
        //filter 方法用来迭代一个数组，并且按给出的条件过滤出符合的元素
        //filter 方法传入一个回调函数，这个回调函数会携带一个参数，参数为当前迭代的项（我们叫它 val ）。
        //回调函数返回 true 的项会保留在数组中，返回 false 的项会被过滤出数组
        return this.playAreaPokerGroup.filter(
            pg =>pg.pokerGroup.filter(
                p=>p.point === poker.point && p.suit === poker.suit
            ).length > 0 
        ).length > 0;
    }
    public isIndexPlayAreaGroupTop(poker:Poker):boolean{
        for(let pg of this.playAreaPokerGroup){
            let pokers = pg.pokerGroup;
            if(pokers.length > 0){
                let p = pokers[pokers.length - 1];
                if(p.point === poker.point && p.suit === poker.suit){
                    return true;
                }
            }
        }
        return false;
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
