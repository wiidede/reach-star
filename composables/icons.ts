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
    'i-solar-notebook-bookmark-bold-duotone',
    'i-solar-notebook-bold-duotone',
    'i-solar-book-bold-duotone',
    'i-solar-bill-list-bold-duotone',
    'i-solar-bookmark-square-minimalistic-bold-duotone',
    'i-solar-broom-bold-duotone',
    'i-solar-bath-bold-duotone',
    'i-solar-washing-machine-minimalistic-bold-duotone',
    'i-solar-dna-bold-duotone',
    'i-solar-telescope-bold-duotone',
    'i-solar-buildings-2-bold-duotone',
    'i-solar-buildings-bold-duotone',
    'i-solar-home-bold-duotone',
    'i-solar-hospital-bold-duotone',
    'i-solar-bicycling-round-bold-duotone',
    'i-solar-dumbbells-2-bold-duotone',
    'i-solar-stretching-round-bold-duotone',
    'i-solar-swimming-bold-duotone',
    'i-solar-treadmill-bold-duotone',
    'i-solar-hiking-bold-duotone',
    'i-solar-meditation-bold-duotone',
    'i-solar-running-2-bold-duotone',
    'i-solar-people-nearby-bold-duotone',
    'i-solar-basketball-bold-duotone',
    'i-solar-camera-bold-duotone',
    'i-solar-confetti-bold-duotone',
    'i-solar-cosmetic-bold-duotone',
    'i-solar-accumulator-bold-duotone',
    'i-solar-devices-bold-duotone',
    'i-solar-gamepad-bold-duotone',
    'i-solar-ghost-bold-duotone',
    'i-solar-cassette-bold-duotone',
    'i-solar-moon-fog-bold-duotone',
    'i-solar-sleeping-circle-bold-duotone',
    'i-solar-pill-bold-duotone',
    'i-solar-adhesive-plaster-bold-duotone',
    'i-solar-turntable-music-note-bold-duotone',
    'i-solar-archive-bold-duotone',
    'i-solar-armchair-bold-duotone',
    'i-solar-asteroid-bold-duotone',
    'i-solar-atom-bold-duotone',
    'i-solar-plain-3-bold-duotone',
    'i-solar-rocket-bold-duotone',
    'i-solar-black-hole-bold-duotone',
    'i-solar-benzene-ring-bold-duotone',
    'i-solar-bag-heart-bold-duotone',
    'i-solar-card-bold-duotone',
    'i-solar-cart-5-bold-duotone',
    'i-solar-cart-large-minimalistic-bold-duotone',
    'i-solar-balloon-bold-duotone',
    'i-solar-bolt-circle-bold-duotone',
    'i-solar-call-chat-bold-duotone',
    'i-solar-camera-square-bold-duotone',
    'i-solar-chat-round-like-bold-duotone',
    'i-solar-clapperboard-play-bold-duotone',
    'i-solar-clock-square-bold-duotone',
    'i-solar-code-scan-bold-duotone',
    'i-solar-code-square-bold-duotone',
    'i-solar-compass-square-bold-duotone',
    'i-solar-delivery-bold-duotone',
    'i-solar-magic-stick-bold-duotone',
    'i-solar-magic-stick-3-bold-duotone',
    'i-solar-pip-bold-duotone',
    'i-solar-point-on-map-bold-duotone',
    'i-solar-ranking-bold-duotone',
    'i-solar-shield-minimalistic-bold-duotone',
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
    'i-solar-crown-star-bold-duotone',
    'i-solar-crown-line-bold-duotone',
    'i-solar-bottle-bold-duotone',
    'i-solar-cup-bold-duotone',
    'i-solar-cup-paper-bold-duotone',
    'i-solar-ladle-bold-duotone',
    'i-solar-tea-cup-bold-duotone',
    'i-solar-wineglass-triangle-bold-duotone',
    'i-solar-airbuds-bold-duotone',
    'i-solar-gameboy-bold-duotone',
    'i-solar-airbuds-case-bold-duotone',
    'i-solar-confetti-minimalistic-bold-duotone',
    'i-solar-emoji-funny-circle-bold-duotone',
    'i-solar-sticker-smile-circle-bold-duotone',
    'i-solar-oven-mitts-minimalistic-bold-duotone',
    'i-solar-medal-ribbons-star-bold-duotone',
    'i-solar-medal-star-square-bold-duotone',
    'i-solar-medal-star-bold-duotone',
    'i-solar-dollar-minimalistic-bold-duotone',
    'i-solar-verified-check-bold-duotone',
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
