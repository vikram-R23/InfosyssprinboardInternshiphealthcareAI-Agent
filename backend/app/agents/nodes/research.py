from app.agents.state import AgentState
from app.db import get_supabase
from sentence_transformers import SentenceTransformer

# Load the model once to avoid loading it on every node execution
# In a real heavy-load production app, this would be behind a separate embedding microservice or API.
_embedding_model = None

def get_embedding_model():
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = SentenceTransformer('all-mpnet-base-v2')
    return _embedding_model

def research_node(state: AgentState) -> dict:
    """
    Research Agent: Performs a RAG lookup against Supabase pgvector using the extracted symptoms.
    """
    symptoms = state.get("symptoms", "")
    if not symptoms or symptoms.lower() == "unknown":
        return {"medical_knowledge_context": "No specific symptoms provided for lookup."}
        
    try:
        model = get_embedding_model()
        # Generate embedding for the symptoms (output is numpy array, convert to list)
        query_embedding = model.encode(symptoms).tolist()
        
        supabase = get_supabase()
        
        # Call the RPC function defined in supabase_schema.sql
        response = supabase.rpc(
            'match_medical_knowledge',
            {
                'query_embedding': query_embedding,
                'match_threshold': 0.3, # Adjust based on needed sensitivity
                'match_count': 3
            }
        ).execute()
        
        if response.data and len(response.data) > 0:
            context_pieces = []
            for item in response.data:
                context_pieces.append(
                    f"- Symptom match: {item['symptom']}, Associated Condition: {item['condition']}, "
                    f"Recommended Department: {item['department']}, Default Urgency: {item['urgency']}"
                )
            context = "Matched knowledge base entries:\\n" + "\\n".join(context_pieces)
        else:
            context = "No direct matches found in the medical knowledge base. Proceed with general clinical guidelines."
            
    except Exception as e:
        print(f"Research node error: {str(e)}")
        raise RuntimeError(f"Failed to query medical knowledge base: {str(e)}")
        
    return {
        "medical_knowledge_context": context
    }
