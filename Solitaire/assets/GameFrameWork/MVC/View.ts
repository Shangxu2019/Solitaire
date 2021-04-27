import Events from "../Base/Events";

const {ccclass, property} = cc._decorator;
@ccclass
export default class View extends cc.Component {
    private m_Events:Events = null;
    /**
     * life cycle function
     */
    onLoad(){ 
        this.m_Events = new Events();
    }
    start(){}
    onDestroy(){
        this.m_Events.clear();
        this.m_Events = null;
    }
    /**
     * restructure Events function
     */
     public on(name,func,target?){this.m_Events.on(name,func,target);}
    public once(name,func,target?){this.m_Events.once(name,func,target);}
    public emit(name,...args){this.m_Events.emit(name,...args);}
    public off(name,func){this.m_Events.off(name,func);}
    public clear(){this.m_Events.clear();}
}