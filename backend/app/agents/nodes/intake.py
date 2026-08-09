from app.agents.state import AgentState
from langchain_core.messages import AIMessage

def intake_node(state: AgentState) -> dict:
    """
    Intake Agent: Parses raw messages from the user to extract structured symptoms.
    In a real implementation, this would use an LLM with tool calling to extract schema.
    """
    messages = state.get("messages", [])
    latest_message = messages[-1].content if messages else ""
    
    # Mock logic: simply use the latest message as the symptoms
    return {
        "symptoms": latest_message,
        "duration": "unknown",  # Would be extracted
        "severity": "unknown",  # Would be extracted
    }
