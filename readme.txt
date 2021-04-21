从零开始，记录学习cocoscreator并通过cocoscreator+typescript开发纸牌游戏的全过程，项目学习参考numas的博客和bilibili网站视频
Solitaire的玩法：
下载一款纸牌游戏并每种功能体验至少2个小时以上

下载cocoscreator,创建一个TS模板项目
把新建的工程使用git管理起来
工程的代码配置环境参照cocos官网提供的说明即可
素材就用Cocos官方的一个实例项目“二十一点”
到从github上克隆到本地
setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。是window对象的一个方法
3 秒（3000 毫秒）后弹出 "Hello" :
setTimeout(function(){ alert("Hello"); }, 3000);
cc.director.loadScene切换场景
        setTimeout(()=>{
            cc.director.loadScene('GameScene',()=>{
                console.log(">>> this is onGameScene lunched callback!");
            });
        },3000
        );


