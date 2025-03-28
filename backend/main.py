from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# ✅ Enable CORS (Update to only allow React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow only React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# ✅ Define request body model
class QueryRequest(BaseModel):
    question: str

# ✅ API endpoint for queries
@app.post("/query")
async def query_handler(request: QueryRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    # Mock response (Replace with actual logic later)
    return {"answer": f"Mock response to: {request.question}"}

# ✅ Root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI! Backend is running."}
