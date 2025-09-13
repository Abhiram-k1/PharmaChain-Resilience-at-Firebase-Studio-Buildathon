
VISIT THIS: https://pharma-chain-resilience-at-firebase.vercel.app/
https://9000-firebase-studio-1757746211982.cluster-y3k7ko3fang56qzieg3trwgyfg.cloudworkstations.dev

# 🚀 Tech Stack Flow for Risk Management System
This project demonstrates a complete **AI-driven risk management pipeline** that predicts, analyzes, and visualizes potential supply chain disruptions using real-time global signals.

---

## 📊 Flow Overview
External Data Sources → Preprocessing → Risk Analysis Engine → Data Storage → Dashboard → AI Interaction Layer

[📄 View Full PDF](./Tech%20Stack%20Flow.pdf)

---

## 🔹 1. Data Ingestion Layer
- **News & Event APIs**: Google News, GDELT, Bloomberg → global disruptions.  
- **Weather APIs**: Google Weather API, OpenWeatherMap → floods, storms, droughts.  
- **Economic/Trade Data**: World Bank API, UN Trade Data, commodity price feeds.  
- **IoT/Warehouse Sensors (Optional)**: temperature, stock levels.  

---

## 🔹 2. Preprocessing & Event Structuring
- **Firebase Cloud Functions**: fetches raw feeds.  
- **Gemini API**:  
  - Summarizes long reports.  
  - Classifies relevance (High/Medium/Low).  
  - Extracts entities (location, commodity, supplier).  

---

## 🔹 3. Risk Analysis Engine
- **Gemini API (Reasoning Layer):**  
  - Predicts disruption severity.  
  - Cross-checks historical shortages.  
  - Suggests contingency plans.  

---

## 🔹 4. Data Storage & Sync
- **Firestore**: disruption events, risk scores, suppliers.  
- **Firebase Authentication**: secure login.  
- **Firebase Cloud Messaging**: real-time alerts.  

---

## 🔹 5. Frontend / Dashboard
- **React / Flutter Web**: cross-platform UI.  
- Features:  
  - Real-time risk dashboard.  
  - Map visualization.  
  - Timeline impact curve.  
  - Supplier suggestions.  
- **Firebase Hosting**: deploys dashboard.  

---

## 🔹 6. AI Interaction Layer
- **Chat Interface (Gemini API + Firebase):**  
  - User queries supply chain risks.  
  - Structured AI insights with sources.  

---

## 🛠️ Suggested Tech Stack
- **Frontend:** React.js / Flutter Web  
- **Backend:** Firebase (Firestore, Functions, Hosting, Auth, Cloud Messaging)  
- **AI:** Gemini API (reasoning + text understanding)  
- **Data APIs:** Google News, Weather, Trade Data  
- **Visualization:** Mapbox / Google Maps API  

---

## 📌 Diagram
You can include a visual preview (recommended for README readability):

```markdown
![Tech Stack Flow](./images/tech_stack_flow.png)


To get started, take a look at src/app/page.tsx.
