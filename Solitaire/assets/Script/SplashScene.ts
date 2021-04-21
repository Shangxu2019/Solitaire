const {ccclass, property} = cc._decorator;

@ccclass
export default class SplashScene extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    start () {
        // init logic
        this.label.string = '这里是加载场景';
        setTimeout(()=>{
            cc.director.loadScene('GameScene',()=>{
                console.log(">>> this is onGameScene lunched callback!");
            });
        },3000
        );
    }
}
