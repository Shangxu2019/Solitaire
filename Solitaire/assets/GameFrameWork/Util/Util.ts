export default class UIUtil{
    
    //变换节点,更改父节点并保持显示上的相对位置不变，加入this变成链式结构
    public static transformNode(this,node:cc.Node,target:cc.Node,cleanup:boolean = false){
        let wp = node.convertToWorldSpaceAR(cc.v2(0,0));
        let pp = target.convertToNodeSpaceAR(wp);
        node.removeFromParent(cleanup);//如果不传入或传入true参数，该节点上所有绑定的事件和action都会被删除
        target.addChild(node);
        node.setPosition(pp);
    }
    public static log(this){
        console.log('测试链式结构');
        return this;
    }
}