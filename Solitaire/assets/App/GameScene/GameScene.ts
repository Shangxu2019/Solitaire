
import GameCtrl from "./GameCtrl";
import GameView from "./GameView/GameView";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    //获取gameview的预制
    @property(cc.Prefab)
    gameViewPrefab:cc.Prefab = null;
    //MVC形式
    //view
    private m_gameView:GameView = null;
    //ctrl
    private m_gameCtrl:GameCtrl = null;

    onLoad(){
        console.log(">>> GameScene:onload");
    }
    start () {
        //动态加载gameview
        this.m_gameView = cc.instantiate(this.gameViewPrefab).getComponent(GameView);
        this.node.addChild(this.m_gameView.node);
        this.m_gameCtrl = new GameCtrl();
        this.m_gameCtrl.init(this.m_gameView);
        this.m_gameCtrl.start();
    }
}
