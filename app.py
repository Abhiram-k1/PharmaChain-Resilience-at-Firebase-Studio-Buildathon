import streamlit as st

# Title and Description
st.set_page_config(page_title="PharmaChain Resilience", layout="wide")
st.title("💊 PharmaChain Resilience")
st.subheader("Firebase Studio Buildathon Project")

st.write("""
This project, **PharmaChain Resilience**, is built to address supply chain 
resilience for pharmaceuticals. It leverages **Next.js (frontend)**, 
**Firebase (backend & database)**, and integrates real-time updates on 
supply chain disruptions.  

This Streamlit app acts as a wrapper to present:
- 📄 Project documentation
- 🔗 Links to GitHub & Firebase demo
- 📊 Potential future dashboards (supply chain disruptions, alerts, etc.)
""")

# Show your README.md directly in Streamlit
with open("README.md", "r", encoding="utf-8") as f:
    st.markdown(f.read(), unsafe_allow_html=True)

# Optionally embed your PDF if you want
pdf_path = "Tech Stack Flow.pdf"
try:
    with open(pdf_path, "rb") as pdf_file:
        st.download_button("📥 Download Tech Stack Flow (PDF)", pdf_file, file_name="Tech_Stack_Flow.pdf")
except FileNotFoundError:
    st.warning("Tech Stack Flow PDF not found in repo. Please upload it.")

# Links
st.markdown("---")
st.markdown("🔗 [GitHub Repository](https://github.com/Abhiram-k1/PharmaChain-Resilience-at-Firebase-Studio-Buildathon)")
st.markdown("🌐 [Firebase / Web Demo (if hosted)](#)")
