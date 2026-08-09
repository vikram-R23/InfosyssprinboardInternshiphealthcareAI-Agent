from app.agents.state import AgentState

def appointment_node(state: AgentState) -> dict:
    """
    Appointment Agent: Checks availability and books slot.
    """
    # Mocking booking logic
    department = state.get("recommended_department", "General")
    
    return {
        "appointment_status": "booked",
        "appointment_id": "mock-apt-12345"
    }
