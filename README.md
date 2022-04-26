This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project setup
## 1. Nextjs Project 新規作成
### 1-1.  create-next-app
    npx create-next-app . --typescript
#### Node.js version 10.13以降が必要です。 -> ターミナル `node -v`でver確認出来ます。
### 1-2.  必要 module のインストール
    npm i axios msw swr
### 1-3.  prettierの設定 : package.json
~~~
"prettier": {
    "singleQuote": true,
    "semi": false
}
~~~  
## 2. React-testing-library の導入
### 2-1.  必要 module のインストール
    yarn add -D jest@27.5.1 @testing-library/react @testing-library/jest-dom jest-css-modules @types/node-fetch
### 2-2.  Project folder 直下に"jest.config.js"ファイルを作成して下記設定を追加
    touch jest.config.js
~~~
const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './',
})
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}
module.exports = createJestConfig(customJestConfig)
~~~
### 2-3.  package.jsonに test scriptを追記
~~~
"scripts": {
    ...
    "test": "jest --watch"
},
~~~
## 3. Tailwind CSS の導入
https://tailwindcss.com/docs/guides/nextjs
### 3-1. 必要moduleのインストール
    npm i tailwindcss@latest postcss@latest autoprefixer@latest
### 3-2. tailwind.config.js, postcss.config.jsの生成
    npx tailwindcss init -p
### 3-3. tailwind.config.jsのcontent設定追加
~~~
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
~~~
### 3-4. globals.cssの編集
~~~
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~
## 4. 動作確認
### 4-1. index.tsxの編集
~~~
const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      Hello Nextjs
    </div>
  )
}
export default Home
~~~
#### npm run dev -> Tailwind CSSが効いているかブラウザで確認
### 4-2. `__tests__`フォルダと`Home.test.tsx`ファイルの作成
~~~
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

it('Should render hello text', () => {
  render(<Home />)
  expect(screen.getByText('Hello Nextjs')).toBeInTheDocument()
})
~~~
#### npm test -> テストがPASSするか確認
~~~
 PASS  __tests__/Home.test.tsx
  ✓ Should render hello text (20 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.728 s, estimated 2 s
~~~