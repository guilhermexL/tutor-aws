# seu_projeto/app.py

import streamlit as st
from langchain_ollama import OllamaLLM # Importação correta e atualizada para Ollama
from langchain.prompts import PromptTemplate
import os
import datetime

# Em um ambiente Docker Compose, o hostname do serviço Ollama será 'ollama_service'.
# Usamos os.getenv para tornar isso flexível (para rodar fora do Docker também).
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

# Configurações do Banco de Dados (PLACEHOLDERS para futura implementação)
# Estas variáveis serão definidas no docker-compose.yml, mas a lógica de DB não será implementada agora.
DB_HOST = os.getenv("DB_HOST", "db_service")
DB_NAME = os.getenv("DB_NAME", "metrics_db")
DB_USER = os.getenv("DB_USER", "user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")

# st.cache_resource para garantir que o modelo seja carregado APENAS UMA VEZ
@st.cache_resource
def initialize_llm_chain():
    """
    Função para inicializar o modelo Ollama e a cadeia LangChain.
    Será executada apenas na primeira vez que o aplicativo Streamlit carregar.
    """
    try:
        # Inicializa o Ollama, passando a base_url
        llm = OllamaLLM(model="llama3.1:8b", base_url=OLLAMA_BASE_URL)
        prompt = PromptTemplate.from_template("Pergunta: {user_input}\nResposta:")
        chain = prompt | llm
        print(f"DEBUG: LLM Chain inicializada com sucesso usando base_url: {OLLAMA_BASE_URL}")
        return chain
    
    except Exception as e:
        print(f"ERRO: Falha ao inicializar OllamaLLM. Detalhes: {e}") # Para logs do Docker
        st.error(f"""
            **Erro ao inicializar o modelo LLM.** Por favor, verifique:
            1. Se o serviço Ollama está rodando e acessível em `{OLLAMA_BASE_URL}`.
            2. Se o modelo `llama3.1:8b` está baixado no Ollama.
            Detalhes do erro: `{e}`
        """)
        return None

# Chama a função para inicializar a cadeia
llm_chain = initialize_llm_chain()

# --- Função para Gravar Métricas (PLACEHOLDER para futura implementação) ---
def record_metric(event_type: str, details: str):
    """
    Função de placeholder para registrar métricas no banco de dados.
    Esta função apenas imprimirá para o console por enquanto.
    """
    timestamp = datetime.datetime.now().strftime("%Y-%m-%D %H:%M:%S")
    print(f"MÉTRICA REGISTRADA: [{timestamp}] Tipo: {event_type}, Detalhes: {details}")


# --- Construção da Interface do Usuário com Streamlit (Página Principal) ---
st.set_page_config(
    page_title="Tutor AWS com LLM", # Título da aplicação na aba do navegador
    #page_icon="☁️",
    layout="centered",
    initial_sidebar_state="auto"
)

st.title("Seu Tutor Interativo para Certificação AWS")
st.markdown("""
Bem-vindo ao seu assistente pessoal de estudos para certificações AWS!
Use o campo abaixo para fazer suas perguntas sobre serviços, conceitos ou melhores práticas da AWS.
""")
st.markdown("---")

user_question = st.text_area(
    "Digite sua pergunta sobre AWS aqui:",
    height=150,
    #placeholder="Ex: Explique o EC2 e seus tipos de instância."
)

if st.button("Obter Resposta do Tutor", type="primary"):
    if llm_chain is None:
        st.error("O modelo LLM não pôde ser carregado. Não é possível gerar uma resposta.")
        record_metric("LLM_Error", "Modelo não carregado ao tentar gerar resposta.")
    elif user_question:
        with st.spinner("Pensando..."):
            try:
                response_from_llm = llm_chain.invoke({"user_input": user_question})
                st.subheader("Resposta do Tutor AWS:")
                st.success(response_from_llm)
                record_metric("LLM_Success", f"Pergunta: '{user_question[:50]}...', Resposta: '{response_from_llm[:50]}...'")
            except Exception as e:
                st.error(f"Ocorreu um erro ao processar sua pergunta com a LLM: {e}")
                st.info("Verifique se o servidor Ollama está ativo e o modelo `llama3.1:8b` está carregado.")
                record_metric("LLM_Processing_Error", f"Pergunta: '{user_question[:50]}...', Erro: {e}")
    else:
        st.warning("Por favor, digite sua pergunta antes de clicar no botão.")
        record_metric("Input_Warning", "Usuário tentou enviar pergunta vazia.")

st.markdown("---")
st.caption("2025 Todos os direitos reservados.")

st.sidebar.header("Guia Rápido")
st.sidebar.info(
    "1. **Faça sua Pergunta:** Digite sua dúvida sobre AWS no campo de texto principal.\n\n"
    "2. **Obtenha a Resposta:** Clique no botão 'Obter Resposta do Tutor' para ver a LLM em ação."
)
st.sidebar.markdown(f"URL de conexão Ollama: `{OLLAMA_BASE_URL}`")
st.sidebar.markdown(f"Configuração do DB (futuro): Host=`{DB_HOST}`, DB=`{DB_NAME}`") # Mantenha para visibilidade
st.sidebar.markdown("[Saiba mais sobre Streamlit](https://streamlit.io/)")
st.sidebar.markdown("[Saiba mais sobre Ollama](https://ollama.com/)")