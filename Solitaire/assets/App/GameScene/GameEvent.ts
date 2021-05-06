export default class GameEvent{
    public static INIT_POKER:string = 'init_poker';
    public static PLAY:string = 'play';
    public static INIT_GROUP_CARD = 'init_group_card';
    //卡牌从玩牌区移动到收牌区
    public static VM_POKER_MOVE_FROM_PLAYAREA_TO_RECEIVEAREA = 'view_to_model_for_poker_event';
    public static CLICK_POKER = 'click_poker';
}