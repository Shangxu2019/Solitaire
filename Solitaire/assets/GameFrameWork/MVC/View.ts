/**
 * 视图基类
 */
const {ccclass, property} = cc._decorator;
@ccclass
export default class View extends cc.Component {
    private m_Events:cc.EventTarget = null;
    /**
     * life cycle function
     */
    onLoad(){ 
        this.m_Events = new cc.EventTarget();
    }
    onDestroy(){
        this.m_Events.clear();
        this.m_Events = null;
    }
    /**
     * restructure EventTarget function
     */
    public on(type: string, callback: Function, target?: any){
        this.m_Events.on(type,callback,target);
        
    }
    public off(type: string, callback?: Function, target?: any){
        this.m_Events.off(type, callback, target);		
    }
    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any){
        this.m_Events.once(type,callback);		
    }
    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any){
        this.m_Events.emit(key, arg1, arg2, arg3, arg4, arg5);	
    }
    public clear(){
        this.m_Events.clear();
    }
}