# **App Name**: PharmaChain Resilience

## Core Features:

- Real-time Event Analysis: Analyzes pharmaceutical supply chain risks from news text using the Gemini API and assesses their impact on the supply chain, including risks such as cold chain integrity, regulatory compliance, quality control, or supplier concentration. Generates a risk score, severity level, summary, affected location, and recommended contingency plans.
- Risk Score Aggregation: Aggregates individual event risk scores into a single, overall risk score for the entire pharmaceutical supply chain.
- Real-time Alert Feed: Displays a real-time list of alerts, each including a title, severity badge, and brief summary.
- Geographic Risk Visualization: Visualizes events on a map using Mapbox, with marker colors indicating risk severity.
- Risk Score Timeline: Displays a historical timeline chart of the overall risk score using Recharts.
- Contingency Recommendations: Tool which offers contingency plans and suggests alternative suppliers based on AI analysis of event data. The Gemini API reviews known pharmaSuppliers when forming its output, incorporating them when suitable.
- Simulated Event Trigger: Triggers the ingestion of external data, simulating real-world data feeds to demonstrate dashboard functionality.
- Backend Data Ingestion: Fetches data from an external source and triggers the analyzePharmaEvent Cloud Function.
- Frontend Recommendation Display: Displays the contingency plan and recommended suppliers from the most recent event.

## Style Guidelines:

- Primary color: Deep sky blue (#00BFFF), reflecting trust and reliability, core to pharmaceutical operations.
- Background color: Light sky blue (#E1F5FE), creating a clean and calming dashboard environment.
- Accent color: Electric indigo (#6F00FF) to highlight key metrics and interactive elements, drawing user attention without overwhelming the interface.
- Font pairing: 'Space Grotesk' (sans-serif) for headings and 'Inter' (sans-serif) for body text. Use 'Source Code Pro' (monospace) to display code snippets.
- Use clear, minimalist icons to represent different types of risks and data points, enhancing usability.
- Dashboard layout should be clean and well-organized, featuring clear sections for risk scores, real-time alerts, maps, and recommendations.
- Use subtle animations to provide feedback on user interactions, improving user engagement without distracting from critical data.