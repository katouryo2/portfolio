const JA_TO_EN: Record<string, string> = {
  // 主食
  'ごはん': 'rice',
  'ご飯': 'rice',
  '白米': 'white rice',
  '玄米': 'brown rice',
  'パン': 'bread',
  '食パン': 'white bread',
  'うどん': 'udon noodles',
  'そば': 'soba noodles',
  'ラーメン': 'ramen noodles',
  'パスタ': 'pasta',
  'スパゲッティ': 'spaghetti',
  'そうめん': 'somen noodles',
  'もち': 'mochi rice cake',
  'おにぎり': 'rice ball',
  'お粥': 'rice porridge',
  'チャーハン': 'fried rice',
  'カレーライス': 'curry rice',
  'オートミール': 'oatmeal',
  'シリアル': 'cereal',

  // 肉
  '鶏肉': 'chicken',
  '鶏むね肉': 'chicken breast',
  '鶏もも肉': 'chicken thigh',
  'ささみ': 'chicken tenderloin',
  '豚肉': 'pork',
  '豚バラ': 'pork belly',
  '豚ロース': 'pork loin',
  '牛肉': 'beef',
  'ステーキ': 'steak',
  'ハンバーグ': 'hamburger patty',
  'ベーコン': 'bacon',
  'ハム': 'ham',
  'ソーセージ': 'sausage',
  'ウインナー': 'wiener sausage',
  '焼き鳥': 'grilled chicken skewer',
  '唐揚げ': 'fried chicken',
  'とんかつ': 'pork cutlet',

  // 魚介
  '鮭': 'salmon',
  'サーモン': 'salmon',
  'まぐろ': 'tuna',
  'マグロ': 'tuna',
  'えび': 'shrimp',
  'エビ': 'shrimp',
  'いか': 'squid',
  'たこ': 'octopus',
  'さば': 'mackerel',
  'さんま': 'pacific saury',
  'あじ': 'horse mackerel',
  '刺身': 'sashimi',
  '寿司': 'sushi',

  // 卵・乳製品
  '卵': 'egg',
  'たまご': 'egg',
  'ゆで卵': 'boiled egg',
  '目玉焼き': 'fried egg',
  'オムレツ': 'omelette',
  '牛乳': 'milk',
  'チーズ': 'cheese',
  'ヨーグルト': 'yogurt',
  'バター': 'butter',

  // 豆腐・大豆
  '豆腐': 'tofu',
  '納豆': 'natto',
  '味噌汁': 'miso soup',
  '味噌': 'miso',
  '枝豆': 'edamame',

  // 野菜
  'トマト': 'tomato',
  'きゅうり': 'cucumber',
  'キャベツ': 'cabbage',
  'レタス': 'lettuce',
  'にんじん': 'carrot',
  '人参': 'carrot',
  'たまねぎ': 'onion',
  '玉ねぎ': 'onion',
  'じゃがいも': 'potato',
  'さつまいも': 'sweet potato',
  'ブロッコリー': 'broccoli',
  'ほうれん草': 'spinach',
  'ピーマン': 'green pepper',
  'なす': 'eggplant',
  'かぼちゃ': 'pumpkin',
  'もやし': 'bean sprouts',
  'きのこ': 'mushroom',
  'しいたけ': 'shiitake mushroom',
  'アボカド': 'avocado',
  'コーン': 'corn',
  'とうもろこし': 'corn',
  '大根': 'daikon radish',
  'ごぼう': 'burdock root',
  'れんこん': 'lotus root',
  'サラダ': 'salad',

  // 果物
  'りんご': 'apple',
  'バナナ': 'banana',
  'みかん': 'mandarin orange',
  'オレンジ': 'orange',
  'いちご': 'strawberry',
  'ぶどう': 'grape',
  'もも': 'peach',
  'すいか': 'watermelon',
  'メロン': 'melon',
  'キウイ': 'kiwi',
  'グレープフルーツ': 'grapefruit',
  'レモン': 'lemon',
  'パイナップル': 'pineapple',
  'マンゴー': 'mango',
  '梨': 'pear',
  '柿': 'persimmon',

  // 飲み物
  'コーヒー': 'coffee',
  '紅茶': 'black tea',
  '緑茶': 'green tea',
  'お茶': 'green tea',
  'ジュース': 'orange juice',
  'コーラ': 'cola',
  'ビール': 'beer',
  '日本酒': 'sake',
  'ワイン': 'wine',
  '焼酎': 'shochu',
  '豆乳': 'soy milk',
  'プロテイン': 'protein shake',

  // お菓子・デザート
  'チョコレート': 'chocolate',
  'クッキー': 'cookie',
  'ケーキ': 'cake',
  'アイスクリーム': 'ice cream',
  'アイス': 'ice cream',
  'ポテトチップス': 'potato chips',
  'せんべい': 'rice cracker',
  'まんじゅう': 'manju bun',
  'プリン': 'pudding',
  'ドーナツ': 'donut',
  'パンケーキ': 'pancake',

  // 料理
  '豚汁': 'pork miso soup',
  'カレー': 'curry',
  'シチュー': 'stew',
  'グラタン': 'gratin',
  'ピザ': 'pizza',
  'サンドイッチ': 'sandwich',
  'ハンバーガー': 'hamburger',
  'ポテトフライ': 'french fries',
  'フライドポテト': 'french fries',
  '天ぷら': 'tempura',
  '焼きそば': 'fried noodles',
  'お好み焼き': 'okonomiyaki pancake',
  'たこ焼き': 'takoyaki',
  '餃子': 'gyoza dumpling',
  '春巻き': 'spring roll',
  '肉じゃが': 'nikujaga beef stew',
  '野菜炒め': 'stir fried vegetables',
  'コロッケ': 'croquette',
  '親子丼': 'chicken and egg rice bowl',
  '牛丼': 'beef rice bowl',
  'かつ丼': 'pork cutlet rice bowl',

  // ナッツ・その他
  'アーモンド': 'almonds',
  'ピーナッツ': 'peanuts',
  'くるみ': 'walnuts',
  'ナッツ': 'mixed nuts',
  'はちみつ': 'honey',
  'マヨネーズ': 'mayonnaise',
  'ケチャップ': 'ketchup',
  '醤油': 'soy sauce',
};

// 数量の日本語パターンを英語に変換
const QTY_PATTERNS: [RegExp, string][] = [
  [/(\d+)\s*個/, '$1'],
  [/(\d+)\s*杯/, '$1 cup'],
  [/(\d+)\s*枚/, '$1 slice'],
  [/(\d+)\s*本/, '$1'],
  [/(\d+)\s*切れ/, '$1 slice'],
  [/(\d+)\s*パック/, '$1 pack'],
  [/(\d+)\s*グラム/, '$1g'],
  [/(\d+)\s*g/, '$1g'],
];

export function translateQuery(query: string): { translated: string; success: boolean } {
  let translated = query.trim();

  // 数量パターンを変換
  for (const [pattern, replacement] of QTY_PATTERNS) {
    translated = translated.replace(pattern, replacement);
  }

  // 辞書で食品名を変換（長い語句から優先的にマッチ）
  const sortedEntries = Object.entries(JA_TO_EN).sort(
    (a, b) => b[0].length - a[0].length
  );

  for (const [ja, en] of sortedEntries) {
    if (translated.includes(ja)) {
      translated = translated.replace(ja, en);
    }
  }

  // 変換後に残った日本語文字を除去（助詞「の」等）
  translated = translated.replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF]+/g, ' ');
  translated = translated.replace(/\s+/g, ' ').trim();

  return { translated, success: translated.length > 0 };
}

// 日本語文字が含まれているか判定
export function containsJapanese(text: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text);
}
