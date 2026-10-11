from fastapi import FastAPI

# Create fastAPI application
app = FastAPI()

@app.get("/")
def test_endpoint():
    return {"message": "Ahoj! FastAPI backend úspěšně běží.", "status": "ok"}