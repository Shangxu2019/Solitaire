const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScene extends cc.Component {

    @property(cc.Button)
    playBtn: cc.Button = null;
    onLoad(){
        
    }
    start () {
        // let self = this;
        // this.playBtn.node.on('click', function (button) {
        //     //this.onPlayBtnClick();//这样写会报错提示 onPlayBtnClick不是一个方法，原因是这里的this指的是function
        //                             //而不是StartScene,这里可以通过self引用来正确的调用方法
        //     self.onPlayBtnClick();
                                    
        //  });
        //  //或者通过匿名方法访问this指针
        //  this.playBtn.node.on('click', (button)=>{
        //     this.onPlayBtnClick();
        //  })
        //以上两种方法都可以解决问题，但通常不这么写，而是更简洁的通过绑定this指针来实现
        //this.playBtn.node.on('click',this.onPlayBtnClick.bind(this));
        //实际上on的api还提供了更简洁的实现，等价于上面this指针绑定
        this.playBtn.node.on('click',this.onPlayBtnClick,this);

    }
    onPlayBtnClick(button){
        //这里来测试一下this指针有没有传递过来
        this.thisTestLog();
        cc.director.loadScene('GameScene');
        //这里测试一下按钮有没有传递过来
        console.log(`btnName:${button.name}`);
    }
    thisTestLog(){
        console.log(">>> test this is binded");
    }
}
