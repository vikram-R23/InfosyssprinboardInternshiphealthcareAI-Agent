from app.agents.state import AgentState
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings
from pydantic import BaseModel, Field

class IntakeSchema(BaseModel):
    symptoms: str = Field(description="The core medical symptoms the patient is experiencing")
    duration: str = Field(description="How long the patient has been experiencing the symptoms")
    severity: str = Field(description="The self-reported severity of the symptoms (e.g., mild, moderate, severe, or unknown)")

def intake_node(state: AgentState) -> dict:
    """
    Intake Agent: Parses raw messages from the user to extract structured symptoms.
    Uses ChatGroq to extract a structured schema.
    """
    messages = state.get("messages", [])
    latest_message = messages[-1].content if messages else ""
    
    # Initialize LLM
    llm = ChatGroq(api_key=settings.GROQ_API_KEY, model_name="qwen/qwen3.6-27b")
    
    # Define structured output
    structured_llm = llm.with_structured_output(IntakeSchema)
    
    # Define Prompt
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert triage intake nurse. Extract the core symptoms, duration, and severity from the patient's message. If a value is not mentioned, infer 'unknown'."),
        ("human", "{message}")
    ])
    
    # Create chain
    chain = prompt | structured_llm
    
    # Invoke
    try:
        result = chain.invoke({"message": latest_message})
        return {
            "symptoms": result.symptoms,
            "duration": result.duration,
            "severity": result.severity,
        }
    except Exception as e:
        print(f"Intake node error: {str(e)}")
        raise RuntimeError(f"Failed to extract symptoms from the message: {str(e)}")
