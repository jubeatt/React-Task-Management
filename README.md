# React-Task-Management

這是來自 [Build Web Apps with React & Firebase](https://www.udemy.com/course/build-web-apps-with-react-firebase/) 課程的其中一項專案，主要是拿來練習 React 而做的團隊合作管理平台。

網站連結：[https://thedojosite-7a15e.web.app](https://thedojosite-7a15e.web.app/)

## 網站介紹

這個網站所包含的功能如下：

- 檢視任務清單
- 顯示目前在線的 User
- 過濾任務清單
- 建立、刪除任務
- 與團隊夥伴溝通（留言板）
- 登入 / 註冊功能
- 上傳自己的大頭像

![demo](demo.gif)

## 測試帳號

- 帳號一：peanu@peanu.dev / 123456
- 帳號二：ppb@peanu.dev / 123456

## 使用的技術

- React
- react-router-dom
- Firebase authentication
- Firebase firestore
- Firebase firestore storage
- Mui
- Custom hook
- useContext / useReducer

## 運行方式

此專案使用 Firebase 作為資料庫，所以請先自行跑完相關申請流程。

1\. 安裝專案的 dependencies

```bash
npm install
```

2\. 建立 `./src/firebase/config.js` 檔案，並填入你的 Firebase 資訊：

```js
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...'
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const timestamp = firebase.firestore.Timestamp
const filedValue = firebase.firestore.FieldValue

export { db, auth, timestamp, storage, filedValue }
```

3\. 啟動開發環境

```bash
npm run start
```

## 打包

```bash
npm run build
```

之後再透過 live-sever 的方式打開 `/build/index.html` 即可
