import httpx
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")
MODEL = os.getenv("MODEL", "mistral:instruct")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")

app = FastAPI(title="Mistral API", version="1.0")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL, "base_url": OLLAMA_BASE_URL}

@app.post("/generate")
def generate(request: PromptRequest):
    try:
        with httpx.Client(timeout=300.0) as client:
            response = client.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json={
                    "model": MODEL, 
                    "prompt": request.prompt, 
                    "stream": False
                }
            )
        
        if response.status_code == 200:
            data = response.json()
            # A resposta do Ollama vem no campo 'response'
            return {
                "response": data.get("response", "Sem resposta disponível"),
                "model": data.get("model", MODEL),
                "done": data.get("done", True)
            }
        else:
            return {"error": f"Ollama API error: {response.status_code}", "detail": response.text}
            
    except httpx.TimeoutException:
        return {"error": "Timeout - Ollama demorou muito para responder"}
    except httpx.ConnectError:
        return {"error": "Não foi possível conectar ao Ollama"}
    except Exception as e:
        return {"error": f"Erro inesperado: {str(e)}"}