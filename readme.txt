���㿪ʼ����¼ѧϰcocoscreator��ͨ��cocoscreator+typescript����ֽ����Ϸ��ȫ���̣���Ŀѧϰ�ο�numas�Ĳ��ͺ�bilibili��վ��Ƶ
Solitaire���淨��
����һ��ֽ����Ϸ��ÿ�ֹ�����������2��Сʱ����

����cocoscreator,����һ��TSģ����Ŀ
���½��Ĺ���ʹ��git��������
���̵Ĵ������û�������cocos�����ṩ��˵������
�زľ���Cocos�ٷ���һ��ʵ����Ŀ����ʮһ�㡱
����github�Ͽ�¡������
setTimeout() ����������ָ���ĺ���������ú����������ʽ����window�����һ������
3 �루3000 ���룩�󵯳� "Hello" :
setTimeout(function(){ alert("Hello"); }, 3000);
cc.director.loadScene�л�����
        setTimeout(()=>{
            cc.director.loadScene('GameScene',()=>{
                console.log(">>> this is onGameScene lunched callback!");
            });
        },3000
        );


