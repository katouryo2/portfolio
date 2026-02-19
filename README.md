# カロリー計算アプリ                                                                         
                                                                                             
  React + TypeScript で構築したカロリー管理アプリケーションです。食品の栄養素検索、日別の食事記
  録、AIによる栄養アドバイスなど、日々の食事管理をサポートする機能を備えています。             
                                                                                               

  ## 主な機能

  - **食品検索** — CalorieNinjas API を使用した食品の栄養素検索（日本語対応）
  - **食事記録** — 朝食・昼食・夕食・間食の4区分で食品を記録
  - **手動入力** — API に無い食品を手動で栄養素入力
  - **1日のサマリー** — カロリーリング＋栄養素バーで摂取状況を可視化
  - **目標設定** — カロリー・タンパク質・脂質・炭水化物の目標値を設定
  - **お気に入り** — よく食べる食品をお気に入り登録してワンタップ追加
  - **カレンダー** — 月間カレンダーで過去の食事記録を確認
  - **週間チャート** — 過去7日間のカロリー推移を棒グラフで表示
  - **AIアドバイス** — Gemini API による栄養バランスの評価とおすすめメニュー提案
  - **ユーザー認証** — Firebase Authentication によるログイン機能
  - **データ同期** — ログインユーザーは Cloud Firestore でデータ永続化・リアルタイム同期
  - **ゲストモード** — 未ログインでも localStorage でデータ保持
  - **ダークモード** — OS設定に連動した自動切り替え
  - **レスポンシブ対応** — モバイル・タブレット・PCに対応

## 画面構成                                                                                  
                                                                                               
  ### ホーム画面                                                                               
                                                                                             
  アプリのメイン画面です。食事の記録・検索・サマリー確認をすべてこの画面で行います。           
                                                                                               
  - **ヘッダー** — アプリタイトル、日付切り替え、ログインボタン                                
  - **1日のサマリー** —                                                                        
  カロリーリング（円グラフ）で摂取カロリーを可視化、タンパク質・脂質・炭水化物のプログレスバー
  - **食品検索** — キーワード入力で CalorieNinjas API から栄養素を検索（日本語対応）
  - **食事区分ボタン** — 朝食・昼食・夕食・間食を切り替えて食品を追加
  - **手動入力** — API にない食品を手動で登録
  - **お気に入り** — よく食べる食品をワンタップで追加
  - **食事カード** — 各区分ごとの食品一覧と小計カロリーを表示
  - **週間チャート** — 過去7日間のカロリー推移を棒グラフで表示
  - **AIアドバイス** — Gemini API
  が食事内容を分析し、栄養バランスの評価とおすすめメニューを提案

  ### カレンダー画面

  過去の食事記録を日別に振り返る画面です。

  - **月間カレンダー** — 月ごとのカレンダー表示、記録がある日にはカロリー数を表示
  - **日付選択** — 日付をクリックすると右側に詳細パネルを表示
  - **詳細パネル** — 選択した日の合計カロリー・P/F/C、食事区分ごとの食品一覧

  ### ログインモーダル

  Firebase Authentication によるユーザー認証画面です。

  - **ログイン** — メールアドレスとパスワードでログイン
  - **新規登録** — アカウント作成フォーム
  - **モード切替** — ログイン / 新規登録をワンクリックで切り替え

  ### 目標設定モーダル

  1日の栄養目標を設定する画面です。

  - **カロリー目標** — 1日の目標カロリー（kcal）
  - **栄養素目標** — タンパク質・脂質・炭水化物それぞれの目標値（g）

  ## 技術スタック

  | カテゴリ | 技術 |
  |---------|------|
  | フロントエンド | React 18, TypeScript, Vite |
  | スタイリング | CSS（ガラスモーフィズム） |
  | 認証 | Firebase Authentication |
  | データベース | Cloud Firestore |
  | グラフ | Recharts |
  | 食品検索API | CalorieNinjas API |
  | AI | Google Gemini API |
  | デプロイ | Vercel |

   ## セットアップ                                                                              
                                                                                             
  ### 1. リポジトリをクローン                                                                  
                                                                                               
  ```bash                                                                                      
  git clone https://github.com/katouryo2/portfolio.git                                         
  cd portfolio/vite-project
  ```

  ### 2. 依存パッケージをインストール

  ```bash
  npm install
  ```

  ### 3. 環境変数ファイルを作成

  プロジェクトルートに `.env` ファイルを作成してください（[環境変数](#環境変数) を参照）。

  ```bash
  cp .env.example .env
  ```

  ### 4. 開発サーバーを起動

  ```bash
  npm run dev
  ```

  ブラウザで `http://localhost:5173` を開いてください。

  ### 5. 本番ビルド

  ```bash
  npm run build
  ```

  ビルド成果物は `dist/` ディレクトリに出力されます。

  ---

  ## 環境変数

  プロジェクトルートの `.env` ファイルに以下の変数を設定してください。

  | 変数名 | 説明 | 取得先 |
  |--------|------|--------|
  | `VITE_CALORIENINJAS_API_KEY` | 食品検索APIキー |
  [CalorieNinjas](https://calorieninjas.com/) |
  | `VITE_GEMINI_API_KEY` | AI アドバイス用APIキー | [Google AI
  Studio](https://aistudio.google.com/) |
  | `VITE_FIREBASE_API_KEY` | Firebase APIキー | [Firebase
  Console](https://console.firebase.google.com/) |
  | `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth ドメイン | Firebase Console |
  | `VITE_FIREBASE_PROJECT_ID` | Firebase プロジェクトID | Firebase Console |
  | `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage バケット | Firebase Console |
  | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | Firebase Console |
  | `VITE_FIREBASE_APP_ID` | Firebase App ID | Firebase Console |

  ## ディレクトリ構成                                                                          
                                                                                               
  ```                                                                                          
  src/                                                                                         
  ├── api/                          # 外部API通信                                              
  │   ├── nutritionix.ts            # CalorieNinjas API（食品検索）                            
  │   ├── gemini.ts                 # Google Gemini API（AIアドバイス）                        
  │   └── foodDictionary.ts         # 日本語→英語の食品名変換辞書                              
  │
  ├── components/                   # UIコンポーネント
  │   ├── DailySummary.tsx / .css   # 1日のサマリー（カロリーリング・栄養素バー）
  │   ├── FoodSearch.tsx / .css     # 食品検索フォーム・検索結果表示
  │   ├── FoodItem.tsx / .css       # 食品アイテム（名前・カロリー・P/F/C）
  │   ├── MealSection.tsx / .css    # 食事区分カード（朝食・昼食・夕食・間食）
  │   ├── ManualEntry.tsx / .css    # 手動入力フォーム
  │   ├── Favorites.tsx / .css      # お気に入り食品一覧
  │   ├── DatePicker.tsx / .css     # 日付切り替え
  │   ├── WeeklyChart.tsx / .css    # 週間カロリー棒グラフ
  │   ├── AiAdvice.tsx / .css       # AIアドバイス表示
  │   ├── MonthlyCalendar.tsx / .css # 月間カレンダー
  │   ├── CalendarPage.tsx / .css   # カレンダー画面（詳細パネル付き）
  │   ├── AuthModal.tsx / .css      # ログイン・新規登録モーダル
  │   └── UserMenu.tsx / .css       # ユーザーメニュー（ログイン状態表示）
  │
  ├── contexts/                     # React Context
  │   └── AuthContext.tsx           # 認証状態管理（Firebase Auth）
  │
  ├── hooks/                        # カスタムフック
  │   ├── useMealLog.ts             # 食事記録の CRUD・日付管理
  │   ├── useGoals.ts               # 栄養目標の取得・更新
  │   └── useFavorites.ts           # お気に入りの追加・削除・判定
  │
  ├── lib/                          # ライブラリ・サービス
  │   └── firestoreService.ts       # Firestore CRUD・リアルタイム購読
  │
  ├── App.tsx                       # メインコンポーネント（ページ切替・レイアウト）
  ├── App.css                       # レイアウト・ナビゲーションスタイル
  ├── index.css                     # デザイントークン（カラー・ガラス変数）
  ├── main.tsx                      # エントリーポイント
  ├── firebase.ts                   # Firebase 初期化設定
  ├── types.ts                      # 型定義（FoodItem, DailyLog 等）
  └── vite-env.d.ts                 # Vite 型定義
  ```
## 使用技術                                                                                  
                                                                                               
  ### フロントエンド                                                                           
                                                                                               
  - **React** 18.2.0 – コンポーネント指向で再利用性の高いUI構築                                
  - **TypeScript** 4.9.3 – 型安全性によるバグの早期発見と開発効率向上                          
  - **Vite** 4.0.0 – 高速なHMRと軽量なビルドによる開発体験の向上                               
                                                                                               
  ### ライブラリ

  - **Recharts** 3.7.0 – 週間カロリー推移の棒グラフ描画
  - **Firebase** 12.9.0 – 認証（Authentication）とデータベース（Cloud Firestore）を統合管理

  ### 認証・データベース

  - **Firebase Authentication** – メールアドレス・パスワードによるユーザー認証
  - **Cloud Firestore** – リアルタイム同期対応のNoSQLデータベースで食事記録を永続化

  ### API

  - **CalorieNinjas API** – 食品名から栄養素（カロリー・P/F/C）を検索、日本語入力にも対応
  - **Google Gemini API** –
  1日の食事記録をAIが分析し、栄養バランスの評価とおすすめメニューを提案

  ### スタイリング

  - **CSS（カスタムプロパティ）** – デザイントークンによるテーマ管理（ライト/ダークモード対応）
  - **ガラスモーフィズム** – `backdrop-filter: blur()` を活用したApple風すりガラスデザイン

  ### デプロイ

  - **Vercel** – CLIによる本番デプロイ、環境変数の安全な管理

  ### その他

  - **localStorage** – ブラウザ上でのデータ永続化（認証なしでも利用可能）
  - **レスポンシブデザイン** – モバイル・タブレット・PCに対応したレイアウト
