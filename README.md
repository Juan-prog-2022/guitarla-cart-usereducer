# GuitarLA Cart 🎸

Shopping cart application built with React and TypeScript.

This project was refactored from a custom hook approach to useReducer, improving state management, scalability, and maintainability.

---

## 🚀 Live Demo

👉 https://fantastic-queijadas-43d563.netlify.app

---

## 📸 Preview

### 🛒 Empty Cart
![Empty Cart](./public/screenshots/empty-cart.png)

### 🛍️ Cart with Products
![Cart with Products](./public/screenshots/cart-items.png)

---

## 🚀 Features

- 🛒 Add and remove products from cart
- ➕ Increase / ➖ decrease quantity
- 🔒 Quantity limits (min / max)
- 💾 Persistent cart using localStorage
- ⚛️ State management with useReducer
- 🧠 Derived state (total price, empty cart)

---

## 🧠 What I Learned

- Migrating from `useState` / custom hooks to `useReducer`
- Centralizing business logic in reducers
- Using `dispatch` and action patterns
- Managing immutable state updates
- Separating UI from logic

---

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Bootstrap

---

## 📦 Installation

```bash
git clone https://github.com/Juan-prog-2022/guitar-la-ts-usereducer.git
cd guitar-la-ts-usereducer
npm install
npm run dev
