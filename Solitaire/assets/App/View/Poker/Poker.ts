import { Esuit } from "../../EnumConfig";

//扑克数据结构
export default class Poker{
    public point:number = -1; //点数
    public suit:Esuit = Esuit.HeiTao;//花色
    constructor(ipoint?:number,isuit?:Esuit){
        if(ipoint){ this.point = ipoint;}
        if(isuit){ this.suit = isuit ; }

    }
}