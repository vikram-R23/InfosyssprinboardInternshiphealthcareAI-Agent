from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.agents.graph import triage_app
from langchain_core.messages import HumanMessage

router = APIRouter()

class SymptomRequest(BaseModel):
    patient_id: str
    message: str

class TriageResponse(BaseModel):
    urgency_level: str
    recommended_department: str
    ai_explanation: str
    appointment_id: str

@router.post("/triage", response_model=TriageResponse)
async def process_symptoms(request: SymptomRequest):
    try:
        # Initialize the state with the user's message
        initial_state = {
            "messages": [HumanMessage(content=request.message)],
            "patient_id": request.patient_id
        }
        
        # Run the graph
        result = triage_app.invoke(initial_state)
        
        # Return the structured response
        return TriageResponse(
            urgency_level=result.get("urgency_level", "Unknown"),
            recommended_department=result.get("recommended_department", "Unknown"),
            ai_explanation=result.get("final_summary", ""),
            appointment_id=result.get("appointment_id", "")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
