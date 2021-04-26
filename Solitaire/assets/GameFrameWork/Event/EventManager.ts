
/*
*事件管理器
*/
export default class EventManager extends cc.EventTarget{
    static instance = null;
    static getInstance():EventManager{
        if(!this.instance){
            this.instance = new EventManager();
        }
        return this.instance;
    }
    constructor(){
        super();
    }

}