// @unocss-include

export function useIcons() {
  const iconList = [
    'i-solar-star-shine-bold-duotone', // 沉淀/背单词
    'i-solar-planet-bold-duotone', // 了解世界
    'i-solar-buildings-3-bold-duotone', // 政治课
    'i-solar-notebook-minimalistic-bold-duotone', // 阅读
    'i-solar-keyboard-bold-duotone', // 打字
    'i-solar-diploma-verified-bold-duotone', // 翻译
    'i-solar-pen-new-square-bold-duotone', // 写字
    'i-solar-crown-star-bold-duotone', // 一些星星
    'i-solar-square-academic-cap-bold-duotone', // 查询考试信息
    'i-solar-star-fall-bold-duotone', // 风火轮星星
    'i-solar-fire-bold-duotone', // 火
    'i-solar-dumbbells-bold-duotone', // 运动
    'i-solar-tea-cup-bold-duotone', // 喝水
  ]
  const randomIcon = () => {
    return iconList[Math.floor(Math.random() * iconList.length)]
  }

  const rewardIconList = [
    'i-solar-cup-hot-bold-duotone', // 奶茶
    'i-solar-chef-hat-heart-bold-duotone', // 爱心厨师帽（蛋糕）
    'i-solar-donut-bold-duotone', // 零食（甜甜圈）
    'i-solar-wineglass-bold-duotone', // 喝酒
    'i-solar-laptop-bold-duotone', // 玩电脑
    'i-solar-clapperboard-play-bold-duotone', // 看视频
    'i-solar-music-notes-bold-duotone', // 听音乐/唱歌
    'i-solar-gamepad-bold-duotone', // 玩游戏
    'i-solar-heart-shine-bold-duotone', // 夸赞
    'i-solar-kick-scooter-bold-duotone', // 出门玩
    'i-solar-chat-square-like-bold-duotone', // 社交/和人聊天
    'i-solar-cart-large-4-bold-duotone', // 购物
    'i-solar-like-bold-duotone', // 夸赞
    'i-solar-confetti-bold-duotone', // 礼花
    'i-solar-crown-bold-duotone', // 一些星星
    'i-solar-cup-star-bold-duotone', // 一些星星
  ]
  const randomRewardIcon = () => {
    return rewardIconList[Math.floor(Math.random() * rewardIconList.length)]
  }

  return {
    iconList,
    randomIcon,
    rewardIconList,
    randomRewardIcon,
  }
}
