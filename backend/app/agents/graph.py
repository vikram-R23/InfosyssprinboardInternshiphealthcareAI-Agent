from langgraph.graph import StateGraph, END
from app.agents.state import AgentState
from app.agents.nodes.intake import intake_node
from app.agents.nodes.research import research_node
from app.agents.nodes.analysis import analysis_node
from app.agents.nodes.decision import decision_node
from app.agents.nodes.appointment import appointment_node
from app.agents.nodes.report import report_node

def create_triage_graph():
    # Initialize Graph
    workflow = StateGraph(AgentState)
    
    # Add Nodes
    workflow.add_node("intake", intake_node)
    workflow.add_node("research", research_node)
    workflow.add_node("analysis", analysis_node)
    workflow.add_node("decision", decision_node)
    workflow.add_node("appointment", appointment_node)
    workflow.add_node("report", report_node)
    
    # Define Edges (The Pipeline)
    workflow.set_entry_point("intake")
    workflow.add_edge("intake", "research")
    workflow.add_edge("research", "analysis")
    workflow.add_edge("analysis", "decision")
    
    # Conditional logic can be added here, but for now we follow the linear path
    workflow.add_edge("decision", "appointment")
    workflow.add_edge("appointment", "report")
    workflow.add_edge("report", END)
    
    # Compile
    return workflow.compile()

triage_app = create_triage_graph()
