const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    onLoad(){
        console.log(">>> GameScene:onload");
    }
    start () {
        // init logic
        this.label.string = '这里是游戏场景';
        console.log(">>> GameScene:start");
    }
}
