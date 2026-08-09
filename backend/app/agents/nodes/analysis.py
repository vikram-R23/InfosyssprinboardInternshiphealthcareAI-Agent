from app.agents.state import AgentState
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage
from app.core.config import settings
import os

def analysis_node(state: AgentState) -> dict:
    """
    Analysis Agent: Evaluates the symptoms against the retrieved medical knowledge.
    """
    symptoms = state.get("symptoms", "")
    context = state.get("medical_knowledge_context", "")
    
    # Normally we would initialize Groq here. 
    # For now, we will mock the LLM reasoning to ensure the graph runs even without API keys.
    # llm = ChatGroq(api_key=settings.GROQ_API_KEY, model_name="llama3-8b-8192")
    
    reasoning = f"Based on the symptoms ({symptoms}) and medical context ({context}), the patient requires evaluation."
    if "chest pain" in symptoms.lower():
         reasoning = "Critical symptom detected (chest pain). High risk of cardiac event. Immediate evaluation needed."
    
    return {
        "analysis_reasoning": reasoning
    }
