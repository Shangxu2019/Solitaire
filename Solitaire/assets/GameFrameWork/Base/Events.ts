/*
*事件管理器
*/
export default class Events{
    /**
     * @description add listener
     * @public
     * @param {string} name name listener
     * @param {function} func function for call
     * @returns {function} unsubscribe function
     */
    public on(name,func,target?){
        if(!this.subscribes[name]){ this.subscribes[name] = []}
        this.subscribes[name].push({f:func,del:false,target:target});
        return ()=>{
            this.off(name,func);
        };
    }
    /**
     * @description like 'on' but just run once
     * @public
     * @param {string} name name listener
     * @param {function} func function for call
     * @param {object} target target for call
     * @returns {function} unsubscribe  function
     */
    public once(name,func,target?){
        let unsubscribe = undefined;
        unsubscribe = this.on(name,(...args:any[])=>{
            func.apply(target,args);
            unsubscribe();
        },target);
        return unsubscribe;
    }
    /**
     * @description dispatch all listener
     * @public
     * @param {string} name name listener
     * @param {any} args arguments for send to on(...)
     * @returns {array} refunds all listen can return data
     */
    public emit(name,...args){
        ++this.m_emit_reference_count;
        if(this.subscribes[name]){
            this.subscribes[name].forEach((v) => {
                if(v.f && !v.del){v.f.apply(v.target,args)}
            });
        }
        --this.m_emit_reference_count
        return;
    }
    /**
     * @description unsubscribe listener
     * @public
     * @param {string} name name listener
     * @param {function} func the function that you want to unsubscribe if not defined,all subscriptions will be canceled
     * @returns {undefined} nothing
     */
    public off(name,func){
        if(this.subscribes[name]){
            if(func){
                this.subscribes[name].forEach(v=>{
                    if(v.f === func){
                        v.del = true;
                    }
                })
            }else{
                this.subscribes[name].forEach(v=>{
                    v.del = true;
                })
            }
        }
        if(this.m_emit_reference_count === 0 ){
            this.clear();
        }
    }
    /**
     * @description clear marked listeners
     */
    public clear(){
        for(let name in this.subscribes){
            this.subscribes[name] = this.subscribes[name].filter((v)=>!v.del)
        }
    }
    private subscribes:{} = {}
    private m_emit_reference_count:number = 0
}