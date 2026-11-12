# official Python image based on Debian slim
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the FastAPI app will run on
EXPOSE 8000
CMD ["fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "8000"]