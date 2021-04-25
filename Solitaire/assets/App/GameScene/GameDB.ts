
/*
游戏牌局数据
*/

import { Esuit } from "../EnumConfig";

//扑克数据结构
export class Poker{
    public point:number = -1; //点数
    public suit:Esuit = Esuit.HeiTao;//花色
    constructor(ipoint?:number,isuit?:Esuit){
        if(ipoint){ this.point = ipoint;}
        if(isuit){ this.suit = isuit ; }

    }
}
export class PokerGroup{
    public get pokerGroup():Poker[]{ return this._pokerGroup;}
    private _pokerGroup:Poker[] = [];
}
export default class GameDB{
    /*************************************************************************
    *public static API
    **************************************************************************/
    public static creat():GameDB{
        let gamedb = new GameDB();
        return gamedb;
    }
    public static readonly CONST_RECEIVE_POKERGROUP:number = 4;
    public static readonly CONST_PLAY_POKERGROUP:number = 7;
    /*************************************************************************
    *public API
    **************************************************************************/
    

   /*************************************************************************
    *private API
    **************************************************************************/
    constructor(){
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
                let poker = new Poker(point,suit);
                this._pokers.push(poker);
            }
        }
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
