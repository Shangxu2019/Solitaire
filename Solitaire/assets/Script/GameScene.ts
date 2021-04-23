import GameCtrl from "./GameCtrl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    private m_gameCtrl:GameCtrl = null;

    @property(cc.Prefab)
    pokerPrefab:cc.Prefab = null;

    @property(cc.Node)
    pokerContainer:cc.Node = null;
    onLoad(){
        console.log(">>> GameScene:onload");
    }
    start () {
        // init logic
        this.label.string = '这里是游戏场景';
        console.log(">>> GameScene:start");

        this.m_gameCtrl = new GameCtrl();
        this.m_gameCtrl.init(this.pokerPrefab,this.pokerContainer);
        this.m_gameCtrl.start();
    }
}
