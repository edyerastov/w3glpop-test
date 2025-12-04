# 🎰 W3GLPop  
*A relaxing and fun Web3-ready game platform built with MERN*

W3GLPop is an entertainment-focused gaming platform designed to give users a smooth, joyful experience.  
While the current product is built on traditional Web2 technologies, the platform is actively evolving toward a fully on-chain Web3 ecosystem.

## 📁 Project Structure  
```
w3glpop/
 ├── public/         # React frontend
 ├── server/         # Node / Express backend
 ├── src/            # source code
 └── readme/         # Specs, design notes, roadmap
```

---

## 🛠 Setup
```
npm install
npm run dev
```

---

## 🚀 Features
W3GLPop currently includes a set of classic, fast-paced mini-games:

### 🎡 Roulette
- Smooth spinning animation  
- Player-friendly UI  
- Fair pseudo-random outcome system  

### 🎰 Slot Machine
- Multi-reel animated slot system  
- Symbol combinations, win multipliers, and bonus rounds  
- Configurable RTP logic  

### ♠️ Blackjack
- Standard 52-card deck logic  
- Hit / Stand / Double / Split actions  
- Dealer AI with configurable rules   

---

## 🔧 Technology Stack
W3GLPop is built with the **MERN Stack**:

- **MongoDB** — Player data, game sessions, leaderboards (SQLite-now)
- **Express.js** — Backend routing and game logic API  
- **React.js** — Frontend interface for all game screens  
- **Node.js** — Scalable backend powering real-time game flows  

---

## 🧩 Game Logic (Overview)

### 🎡 Roulette Logic
- Implements wheel sectors and probability distribution  
- Generates outcomes using server-side RNG  
- Includes bet types (red/black, odd/even, straight, split, corner, etc.)

### 🎰 Slot Machine Logic
- Reel strips stored in backend  
- Symbol weighting defines win frequency  
- Payline evaluation executed after each spin  
- Bonus events triggered on special symbol combinations  

### ♠️ Blackjack Logic
- Card deck generated each round  
- Dealer AI follows “Hit until 17” rules (configurable)  
- Natural blackjack detection  
- Bust / push / win resolution  

---

## Game Expansion  
- Crash game (probability curve engine)  
- Mine game (random grid generator)  
- Video Poker  
- Card Slide  
- Daily quests & reward system