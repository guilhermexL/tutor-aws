# Tutor Virtual Inteligente para Certificação AWS Cloud Practitioner

Um assistente virtual inteligente, com foco em auxiliar estudantes na preparação para o exame **AWS Cloud Practitioner (CLF-C02)**. O projeto foi desenvolvido como um protótipo funcional para demonstração, com potencial de expansão para aplicações educacionais reais.

---

## Objetivo

Desenvolver um **tutor virtual inteligente** que:

* Explique conceitos da AWS de forma clara e interativa.
* Simule questões da prova com feedback em tempo real.
* Acompanhe o progresso do usuário durante a sessão.
* Sugira materiais e links oficiais de estudo com base nas respostas.

---

## Tecnologias Utilizadas

* **Python 3+**
* **Streamlit** – interface web leve e intuitiva
* **OllamaLLM** – geração de respostas com IA
* **dotenv** – gerenciamento de variáveis sensíveis
* **Docker** – empacotamento e portabilidade da aplicação
* **Draw.io** - infraestrutura da plataforma

---

## Como Rodar Localmente

### 1. Clonando o repositório

```bash
git clone https://github.com/guilhermexL/tutor-aws.git
cd tutor-aws-cloud
```

### 2. Ambiente virtual (opcional, mas recomendado)

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` com sua chave da OpenAI:

```
OPENAI_API_KEY=sua-chave-openai
```

### 5. Rode a aplicação

```bash
streamlit run app.py
```

---

## Rodando com Docker

### Build da imagem

```bash
docker build -t tutor-aws .
```

### Execute o container

```bash
docker run -p 8501:8501 --env-file .env tutor-aws
```

Acesse a aplicação em: [http://localhost:8501](http://localhost:8501)

---

## Roadmap (Próximos Passos)

* [ ] Melhorar a curadoria de conteúdos e explicações.
* [ ] Adicionar histórico de sessão do usuário.
* [ ] Criar visualização de desempenho e progresso.
* [ ] Adicionar gamificação (pontos, medalhas, etc).
* [ ] Suporte a múltiplos idiomas (PT-BR / EN-US).
* [ ] Hospedagem em nuvem (opcional para demo final).

---

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./assets/LICENSE) para mais detalhes.

---

## Contribuintes

* [Danilo Dias](https://www.linkedin.com/in/danilo-dias-biodev/)
* [Guilherme Santos](https://www.linkedin.com/in/guilhermee-santos)
* [José Alan](https://www.linkedin.com/in/alan-pires-engenharia/)
* [Ludy Mila Guimarães](https://www.linkedin.com/in/ludymilaguimar%C3%A3es13/)