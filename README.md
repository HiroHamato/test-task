## Task

- Calculator app implemented in plain JavaScript, HTML, and CSS. No frameworks or jQuery used. No `eval` or `Math` APIs for calculations; arithmetic is implemented manually.

### Spec / ТЗ

- Innowise Lab Internship: Level 0: Simple calculator — see the task document: [Google Doc](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit#heading=h.5dt3hghpa22f)

### Features / Возможности

- Basic operations: addition, subtraction, multiplication, division
- Percent and sign toggle (±)
- Decimal input using comma button (internally stored as dot)
- AC button to clear
- Equals to compute current expression
- Light/Dark theme switch — placed at the top-right corner of the page

### Documentation languages / Языки документации

- This README is provided in both English and Russian as required.

## How to run the app

```bash
npm install
npm run start
```

This starts the dev server and opens the app.

Build production bundle:

```bash
npm run build
```

Lint and format:

```bash
npm run lint
npm run format
```

Pre-commit hook via Husky runs `lint-staged` to prevent commits with lint/format issues.

## Folder structure

```
innowise-interview-react-trainee/
├─ src/
│  ├─ index.html        # App HTML shell
│  ├─ index.js          # Calculator logic and UI wiring (vanilla JS)
│  └─ styles.css        # Styling and themes
├─ eslint.config.js     # ESLint configuration (flat config)
├─ .prettierrc          # Prettier configuration
├─ .husky/              # Husky git hooks (pre-commit runs lint-staged)
├─ webpack.config.js    # Webpack bundling/dev-server config
├─ package.json         # Scripts and dev dependencies
└─ README.md            # This file
```

---

## RU

Приложение-калькулятор на чистом JavaScript/HTML/CSS. Не используются фреймворки и jQuery. Для вычислений не применяется `eval` и встроенный `Math` — операции реализованы самостоятельно.

Функции:

- Сложение, вычитание, умножение, деление
- Процент, смена знака (±)
- Ввод десятичной части через кнопку с запятой
- Кнопка AC очищает ввод и аккумулятор
- Кнопка = вычисляет результат
- Переключатель темы — в правом верхнем углу

Скрипты:

- `npm run start` — запуск dev-сервера
- `npm run build` — сборка prod-бандла
- `npm run lint` / `npm run format` — линт/форматирование

---

## EN

Calculator app built with vanilla JavaScript/HTML/CSS. No frameworks or jQuery. No `eval` and no built-in `Math` for calculations — operations are implemented manually.

Features:

- Addition, subtraction, multiplication, division
- Percent, toggle sign (±)
- Decimal input via comma button
- AC clears input and accumulator
- Equals computes the result
- Theme switcher — located at the top-right corner

Scripts:

- `npm run start` — start dev server
- `npm run build` — build production bundle
- `npm run lint` / `npm run format` — lint/format
