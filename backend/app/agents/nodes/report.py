from app.agents.state import AgentState
from langchain_core.messages import AIMessage

def report_node(state: AgentState) -> dict:
    """
    Report Agent: Generates structured summary and formats response.
    """
    urgency = state.get("urgency_level", "Unknown")
    dept = state.get("recommended_department", "Unknown")
    reasoning = state.get("analysis_reasoning", "")
    
    summary = f"Triage Complete: {urgency} Urgency. Recommended Department: {dept}. Reasoning: {reasoning}"
    
    # Return as an AI message to append to the message history
    return {
        "final_summary": summary,
        "messages": [AIMessage(content=summary)]
    }
