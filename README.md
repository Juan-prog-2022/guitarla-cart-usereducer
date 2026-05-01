# GuitarLA Cart 🎸

Shopping cart application built with React and TypeScript.

This project was refactored from a custom hook approach to useReducer, improving state management, scalability, and maintainability.

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
- CSS / Bootstrap

---

👨‍💻 Author

Juan Quiroz


---

# 📸 5. SCREENSHOTS 

```md
![Cart Preview](./public/screenshots/cart.png)


## 📦 Installation

```bash
git clone https://github.com/Juan-prog-2022/guitar-la-ts-usereducer.git
cd guitar-la-ts-usereducer
npm install
npm run dev
