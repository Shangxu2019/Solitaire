import GameCtrl from "./GameCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    private m_gameCtrl:GameCtrl = null;
    onLoad(){
        console.log(">>> GameScene:onload");
    }
    start () {
        // init logic
        this.label.string = '这里是游戏场景';
        console.log(">>> GameScene:start");

        this.m_gameCtrl = new GameCtrl();
        this.m_gameCtrl.start();
    }
}
