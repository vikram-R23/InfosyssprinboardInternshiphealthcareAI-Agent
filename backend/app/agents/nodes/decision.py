from app.agents.state import AgentState

def decision_node(state: AgentState) -> dict:
    """
    Decision/Triage Agent: Assigns urgency level and recommends department.
    """
    reasoning = state.get("analysis_reasoning", "")
    
    urgency = "Low"
    department = "General Practice"
    
    if "Immediate evaluation needed" in reasoning or "High risk" in reasoning:
        urgency = "High"
        department = "Cardiology"
    elif "moderate" in reasoning.lower():
        urgency = "Medium"
        
    return {
        "urgency_level": urgency,
        "recommended_department": department
    }
