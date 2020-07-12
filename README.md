# 📈 都道府県別人口表示サービス
![github pages](https://github.com/yuta-hayashi/japan-stat/workflows/github%20pages/badge.svg)
## 📦機能
このWebアプリは都道府県別の人口を調べることができます。

[RESAS API](https://opendata.resas-portal.go.jp/)から取得した県別の人口を折れ線グラフで表示し、比較できます。

![ex](https://user-images.githubusercontent.com/20057935/87237692-7ba55e00-c434-11ea-808a-d0c829334d25.png)

## 🌐URL
[https://yuta-hayashi.github.io/japan-stat/](https://yuta-hayashi.github.io/japan-stat/)

## 🖥技術構成
このアプリケーションを構成する主なライブラリは以下の通りです。

- フレームワーク
    - [Vue.js](https://jp.vuejs.org/index.html)
- 状態管理
    - [Vuex](https://vuex.vuejs.org/ja/)
- グラフ描写
    - [Chart.js](https://www.chartjs.org/)
    - [vue-chartjs](https://vue-chartjs.org/ja/guide/)(wrapper)
- HTTPクライアント
    - [Axios](https://github.com/axios/axios)

## ✨工夫点
### APIキャッシュ
チェックボックスのUIでは、頻繁に表示・非表示の操作が行われると想定されるため、グラフを表示するときに毎回APIからデータを取得するのは非効率でAPIサーバにも負荷がかかります。また、人口のデータはセッション中に変わる可能性も極めて低いです。

そこで、一度取得したデータはVuexにキャッシュしておき、セッション中はそのデータを使うようにしています。

### ローディング表示
チェックボックスを有効にしてからAPIのデータがグラフに反映されるまで、タイムラグがあるため、右上にデータを取得中であることを示すアニメーションを表示するようにしました。

### エラー表示
APIからデータを取得できなかったときに画面下にエラーを表示します。

(ページ表示後にオフラインにすることでエラーを再現できます。)


## 🛠開発環境

依存関係をインストールします。
```
yarn install
```

### 開発環境を実行
```
yarn serve
```

### ビルド
```
yarn build
```

### Lintをすべてのファイルに適応
```
yarn lint
```

### 設定を変更
[Vue/Cliのドキュメント](https://cli.vuejs.org/config/)
