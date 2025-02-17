# Use Python 3.10 base image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /backend

# Copy the backend source code to the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the backend port
EXPOSE 8000

# Command to run FastAPI app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
