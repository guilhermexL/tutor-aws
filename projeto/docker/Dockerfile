FROM python:3.10-slim-buster

WORKDIR /app

# Copia e instala as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia toda a pasta do projeto (app.py, pages/, etc.)
COPY . .

# Expõe a porta que o Streamlit usará
EXPOSE 8501

# Comando para iniciar a aplicação Streamlit
CMD ["streamlit", "run", "app.py", "--server.port", "8501", "--server.address", "0.0.0.0"]