const JA_TO_EN: Record<string, string> = {
  // 主食
  ごはん: 'rice',
  ご飯: 'rice',
  白米: 'white rice',
  玄米: 'brown rice',
  パン: 'bread',
  食パン: 'white bread',
  うどん: 'udon noodles',
  そば: 'soba noodles',
  ラーメン: 'ramen noodles',
  パスタ: 'pasta',
  スパゲッティ: 'spaghetti',
  そうめん: 'somen noodles',
  もち: 'mochi rice cake',
  おにぎり: 'rice ball',
  お粥: 'rice porridge',
  チャーハン: 'fried rice',
  カレーライス: 'curry rice',
  オートミール: 'oatmeal',
  シリアル: 'cereal',

  // 肉
  鶏肉: 'chicken',
  鶏むね肉: 'chicken breast',
  鶏もも肉: 'chicken thigh',
  ささみ: 'chicken tenderloin',
  豚肉: 'pork',
  豚バラ: 'pork belly',
  豚ロース: 'pork loin',
  牛肉: 'beef',
  ステーキ: 'steak',
  ハンバーグ: 'hamburger patty',
  ベーコン: 'bacon',
  ハム: 'ham',
  ソーセージ: 'sausage',
  ウインナー: 'wiener sausage',
  焼き鳥: 'grilled chicken skewer',
  唐揚げ: 'fried chicken',
  とんかつ: 'pork cutlet',

  // 魚介
  鮭: 'salmon',
  サーモン: 'salmon',
  まぐろ: 'tuna',
  マグロ: 'tuna',
  えび: 'shrimp',
  エビ: 'shrimp',
  いか: 'squid',
  たこ: 'octopus',
  さば: 'mackerel',
  さんま: 'pacific saury',
  あじ: 'horse mackerel',
  刺身: 'sashimi',
  寿司: 'sushi',

  // 卵・乳製品
  卵: 'egg',
  たまご: 'egg',
  ゆで卵: 'boiled egg',
  目玉焼き: 'fried egg',
  オムレツ: 'omelette',
  牛乳: 'milk',
  チーズ: 'cheese',
  ヨーグルト: 'yogurt',
  バター: 'butter',

  // 豆腐・大豆
  豆腐: 'tofu',
  納豆: 'natto',
  味噌汁: 'miso soup',
  味噌: 'miso',
  枝豆: 'edamame',

  // 野菜
  トマト: 'tomato',
  きゅうり: 'cucumber',
  キャベツ: 'cabbage',
  レタス: 'lettuce',
  にんじん: 'carrot',
  人参: 'carrot',
  たまねぎ: 'onion',
  玉ねぎ: 'onion',
  じゃがいも: 'potato',
  さつまいも: 'sweet potato',
  ブロッコリー: 'broccoli',
  ほうれん草: 'spinach',
  ピーマン: 'green pepper',
  なす: 'eggplant',
  かぼちゃ: 'pumpkin',
  もやし: 'bean sprouts',
  きのこ: 'mushroom',
  しいたけ: 'shiitake mushroom',
  アボカド: 'avocado',
  コーン: 'corn',
  とうもろこし: 'corn',
  大根: 'daikon radish',
  ごぼう: 'burdock root',
  れんこん: 'lotus root',
  サラダ: 'salad',

  // 果物
  りんご: 'apple',
  バナナ: 'banana',
  みかん: 'mandarin orange',
  オレンジ: 'orange',
  いちご: 'strawberry',
  ぶどう: 'grape',
  もも: 'peach',
  すいか: 'watermelon',
  メロン: 'melon',
  キウイ: 'kiwi',
  グレープフルーツ: 'grapefruit',
  レモン: 'lemon',
  パイナップル: 'pineapple',
  マンゴー: 'mango',
  梨: 'pear',
  柿: 'persimmon',

  // 飲み物
  コーヒー: 'coffee',
  紅茶: 'black tea',
  緑茶: 'green tea',
  お茶: 'green tea',
  ジュース: 'orange juice',
  コーラ: 'cola',
  ビール: 'beer',
  日本酒: 'sake',
  ワイン: 'wine',
  焼酎: 'shochu',
  豆乳: 'soy milk',
  プロテイン: 'protein shake',

  // お菓子・デザート
  チョコレート: 'chocolate',
  クッキー: 'cookie',
  ケーキ: 'cake',
  アイスクリーム: 'ice cream',
  アイス: 'ice cream',
  ポテトチップス: 'potato chips',
  せんべい: 'rice cracker',
  まんじゅう: 'manju bun',
  プリン: 'pudding',
  ドーナツ: 'donut',
  パンケーキ: 'pancake',

  // 料理
  豚汁: 'pork miso soup',
  カレー: 'curry',
  シチュー: 'stew',
  グラタン: 'gratin',
  ピザ: 'pizza',
  サンドイッチ: 'sandwich',
  ハンバーガー: 'hamburger',
  ポテトフライ: 'french fries',
  フライドポテト: 'french fries',
  天ぷら: 'tempura',
  焼きそば: 'fried noodles',
  お好み焼き: 'okonomiyaki pancake',
  たこ焼き: 'takoyaki',
  餃子: 'gyoza dumpling',
  春巻き: 'spring roll',
  肉じゃが: 'nikujaga beef stew',
  野菜炒め: 'stir fried vegetables',
  コロッケ: 'croquette',
  親子丼: 'chicken and egg rice bowl',
  牛丼: 'beef rice bowl',
  かつ丼: 'pork cutlet rice bowl',

  // ナッツ・その他
  アーモンド: 'almonds',
  ピーナッツ: 'peanuts',
  くるみ: 'walnuts',
  ナッツ: 'mixed nuts',
  はちみつ: 'honey',
  マヨネーズ: 'mayonnaise',
  ケチャップ: 'ketchup',
  醤油: 'soy sauce',
};

// 食品ごとの一般的な1食分の量（g）
// キーは英語変換後の食品名（小文字）
const DEFAULT_SERVING: Record<string, number> = {
  // 主食
  rice: 150,
  'white rice': 150,
  'brown rice': 150,
  bread: 60,
  'white bread': 60,
  'udon noodles': 250,
  'soba noodles': 200,
  'ramen noodles': 230,
  pasta: 250,
  spaghetti: 250,
  'somen noodles': 200,
  'mochi rice cake': 50,
  'rice ball': 110,
  'rice porridge': 250,
  'fried rice': 250,
  'curry rice': 300,
  oatmeal: 40,
  cereal: 40,

  // 肉
  chicken: 120,
  'chicken breast': 120,
  'chicken thigh': 120,
  'chicken tenderloin': 100,
  pork: 120,
  'pork belly': 100,
  'pork loin': 120,
  beef: 120,
  steak: 200,
  'hamburger patty': 150,
  bacon: 30,
  ham: 30,
  sausage: 60,
  'wiener sausage': 60,
  'grilled chicken skewer': 90,
  'fried chicken': 150,
  'pork cutlet': 150,

  // 魚介
  salmon: 80,
  tuna: 80,
  shrimp: 80,
  squid: 80,
  octopus: 80,
  mackerel: 80,
  'pacific saury': 100,
  'horse mackerel': 80,
  sashimi: 100,
  sushi: 300,

  // 卵・乳製品
  egg: 60,
  'boiled egg': 60,
  'fried egg': 60,
  omelette: 120,
  milk: 200,
  cheese: 20,
  yogurt: 120,
  butter: 10,

  // 豆腐・大豆
  tofu: 150,
  natto: 50,
  'miso soup': 200,
  miso: 18,
  edamame: 80,

  // 野菜
  tomato: 150,
  cucumber: 100,
  cabbage: 80,
  lettuce: 50,
  carrot: 80,
  onion: 100,
  potato: 130,
  'sweet potato': 150,
  broccoli: 80,
  spinach: 80,
  'green pepper': 30,
  eggplant: 80,
  pumpkin: 100,
  'bean sprouts': 100,
  mushroom: 50,
  'shiitake mushroom': 30,
  avocado: 100,
  corn: 150,
  'daikon radish': 100,
  salad: 100,

  // 果物
  apple: 200,
  banana: 120,
  'mandarin orange': 100,
  orange: 180,
  strawberry: 100,
  grape: 100,
  peach: 170,
  watermelon: 200,
  melon: 150,
  kiwi: 80,
  grapefruit: 200,
  pineapple: 100,
  mango: 150,
  pear: 200,

  // 飲み物
  coffee: 150,
  'black tea': 150,
  'green tea': 150,
  'orange juice': 200,
  cola: 350,
  beer: 350,
  sake: 180,
  wine: 125,
  'soy milk': 200,
  'protein shake': 300,

  // お菓子
  chocolate: 50,
  cookie: 30,
  cake: 100,
  'ice cream': 100,
  'potato chips': 60,
  'rice cracker': 30,
  pudding: 100,
  donut: 70,
  pancake: 150,

  // 料理
  'pork miso soup': 250,
  curry: 200,
  stew: 250,
  pizza: 200,
  sandwich: 150,
  hamburger: 200,
  'french fries': 130,
  tempura: 100,
  'fried noodles': 250,
  'okonomiyaki pancake': 250,
  takoyaki: 150,
  'gyoza dumpling': 120,
  'spring roll': 60,
  'stir fried vegetables': 150,
  croquette: 70,
  'chicken and egg rice bowl': 350,
  'beef rice bowl': 350,
  'pork cutlet rice bowl': 350,

  // ナッツ
  almonds: 25,
  peanuts: 25,
  walnuts: 25,
  'mixed nuts': 25,
};

// 食品名に対する一般的な量を取得
export function getDefaultServing(foodName: string): number | null {
  const lower = foodName.toLowerCase().trim();
  return DEFAULT_SERVING[lower] ?? null;
}

// クエリに量を自動付与
export function addDefaultServing(query: string): string {
  const serving = getDefaultServing(query.toLowerCase().trim());
  if (serving) {
    return `${serving}g ${query}`;
  }
  return query;
}

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

  // 数量を抽出（例: 700g, 200グラム, 2個）
  let quantity = '';
  for (const [pattern, replacement] of QTY_PATTERNS) {
    const match = translated.match(pattern);
    if (match) {
      quantity = match[0].replace(pattern, replacement);
      translated = translated.replace(pattern, '').trim();
      break;
    }
  }
  // 純粋な数字+gパターン（英数字のみ）
  if (!quantity) {
    const numMatch = translated.match(/(\d+)\s*g\b/i);
    if (numMatch) {
      quantity = numMatch[0];
      translated = translated.replace(numMatch[0], '').trim();
    }
  }

  // 辞書で食品名を変換（長い語句から優先的にマッチ）
  const sortedEntries = Object.entries(JA_TO_EN).sort((a, b) => b[0].length - a[0].length);

  for (const [ja, en] of sortedEntries) {
    if (translated.includes(ja)) {
      translated = translated.replace(ja, en);
    }
  }

  // 変換後に残った日本語文字を除去（助詞「の」等）
  translated = translated.replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF]+/g, ' ');
  translated = translated.replace(/\s+/g, ' ').trim();

  // 数量を前に付ける（"700g rice" の形式）
  if (quantity && translated) {
    translated = `${quantity} ${translated}`;
  }

  return { translated, success: translated.length > 0 };
}

// 日本語文字が含まれているか判定
export function containsJapanese(text: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text);
}
