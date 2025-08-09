import { EmotionType } from '../types';

// 情绪关键词词典
const emotionKeywords: Record<EmotionType, string[]> = {
  happy: [
    '开心', '高兴', '快乐', '愉快', '幸福', '欢乐', '喜悦', 
    '兴高采烈', '哈哈', '嘻嘻', '😊', '😄', '🎉', '太好了'
  ],
  sad: [
    '难过', '伤心', '难受', '痛苦', '悲伤', '哭', '流泪',
    '失望', '沮丧', '郁闷', '😢', '😭', '💔', '唉'
  ],
  excited: [
    '激动', '兴奋', '太棒了', '刺激', '期待', '迫不及待',
    '热血沸腾', '激情', '🎊', '🔥', '💪', 'wow'
  ],
  thoughtful: [
    '思考', '想想', '为什么', '如何', '怎么', '分析', '考虑',
    '琢磨', '研究', '探讨', '🤔', '💭', '问题是'
  ],
  caring: [
    '谢谢', '感谢', '帮助', '关心', '照顾', '体贴', '温暖',
    '支持', '鼓励', '安慰', '❤️', '💕', '🤗', '爱'
  ],
  neutral: []
};

// 情绪得分计算
export function analyzeEmotionWithScore(text: string): { emotion: EmotionType; confidence: number } {
  const lowerText = text.toLowerCase();
  const scores: Record<EmotionType, number> = {
    happy: 0,
    sad: 0,
    excited: 0,
    thoughtful: 0,
    caring: 0,
    neutral: 0
  };

  // 计算每种情绪的得分
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        scores[emotion as EmotionType] += 1;
      }
    }
  }

  // 找出得分最高的情绪
  let maxScore = 0;
  let detectedEmotion: EmotionType = 'neutral';
  
  for (const [emotion, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedEmotion = emotion as EmotionType;
    }
  }

  // 如果没有检测到任何情绪关键词，返回中性
  if (maxScore === 0) {
    return { emotion: 'neutral', confidence: 1.0 };
  }

  // 计算置信度（基于关键词匹配数量）
  const confidence = Math.min(maxScore / 3, 1.0); // 最多3个关键词就达到100%置信度

  return { emotion: detectedEmotion, confidence };
}

// 根据情绪生成回复建议
export function generateEmotionBasedSuggestions(emotion: EmotionType): string[] {
  const suggestions: Record<EmotionType, string[]> = {
    happy: [
      '分享一下让你开心的事情吧！',
      '今天有什么好消息吗？',
      '你的快乐感染到我了！'
    ],
    sad: [
      '需要倾诉一下吗？',
      '我在这里陪着你',
      '一切都会好起来的'
    ],
    excited: [
      '发生什么激动人心的事了？',
      '我也为你感到兴奋！',
      '详细说说吧！'
    ],
    thoughtful: [
      '让我们一起思考这个问题',
      '你的想法很有深度',
      '从另一个角度来看...'
    ],
    caring: [
      '很高兴能帮到你',
      '有需要随时告诉我',
      '我们一起努力'
    ],
    neutral: [
      '请继续说',
      '我在听呢',
      '还有什么想分享的吗？'
    ]
  };

  return suggestions[emotion] || suggestions.neutral;
}

// 情绪颜色映射
export function getEmotionColor(emotion: EmotionType): string {
  const colors: Record<EmotionType, string> = {
    happy: '#4caf50',
    sad: '#2196f3',
    neutral: '#9e9e9e',
    excited: '#ff9800',
    thoughtful: '#673ab7',
    caring: '#e91e63'
  };
  
  return colors[emotion] || colors.neutral;
}

// 情绪强度评估
export function getEmotionIntensity(text: string): 'low' | 'medium' | 'high' {
  // 检查感叹号数量
  const exclamationCount = (text.match(/[!！]/g) || []).length;
  
  // 检查表情符号数量
  const emojiCount = (text.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/gu) || []).length;
  
  // 检查重复字符（如"哈哈哈哈"）
  const hasRepetition = /(.)\1{2,}/.test(text);
  
  const totalIntensityScore = exclamationCount + emojiCount + (hasRepetition ? 2 : 0);
  
  if (totalIntensityScore >= 4) return 'high';
  if (totalIntensityScore >= 2) return 'medium';
  return 'low';
}