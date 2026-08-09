from app.agents.state import AgentState

def research_node(state: AgentState) -> dict:
    """
    Research Agent: Performs a RAG lookup against Supabase pgvector using the extracted symptoms.
    """
    symptoms = state.get("symptoms", "")
    
    # Mock lookup logic
    context = "Patient presents with symptoms similar to mild dehydration or common cold. Typically low urgency. Department: General Practice."
    
    if "chest pain" in symptoms.lower():
        context = "Chest pain is a critical symptom indicative of potential cardiac events. Very High Urgency. Department: Cardiology."
        
    return {
        "medical_knowledge_context": context
    }
