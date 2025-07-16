import streamlit as st

# O Streamlit renderiza o conteúdo do arquivo quando a página é selecionada.
# Não é necessário envolver em uma função "def show_page():"
# mas para páginas secundárias, o título do menu lateral é derivado do nome do arquivo.

st.title("Colaboradores do Projeto")

st.markdown("""
Este projeto foi idealizado e desenvolvido com a colaboração de indivíduos dedicados
a criar uma ferramenta de aprendizado interativa para certificações AWS.
""")

st.header("Conheça a Equipe:")

st.subheader("Danilo Dias")
st.write("""
Contribuiu com o conhecimento técnico em AWS, garantindo a precisão das informações
e revisando o conteúdo gerado pela LLM. Essencial para a qualidade do tutor.
""")
st.markdown("[LinkedIn](https://www.linkedin.com/in/danilo-dias-biodev/) | [GitHub](https://github.com/danilosauro)")

st.markdown("---")

st.subheader("Guilherme Santos")
st.write("""Responsável pela arquitetura geral da aplicação, integração da LLM com LangChain
         e desenvolvimento da interface Streamlit.""")
st.markdown("[LinkedIn](https://linkedin.com/in/guilhermee-santos) | [GitHub](https://github.com/guilhermexL)")

st.markdown("---")

st.subheader("José Alan")
st.write("""
Empenhou no aprendizado de máquina para melhor entendimento do agente inteligente.
""")
st.markdown("[LinkedIn](https://www.linkedin.com/in/alan-pires-engenharia/) | [GitHub](https://github.com/AlanPires01)")

st.markdown("---")

st.subheader("Ludy Mila Guimarães")
st.write("""
Responsável pela documentação e interface de usuário. Apaixonada por CyberSegurança e Desenvolvimento FrontEnd.
""")
st.markdown("[LinkedIn](https://www.linkedin.com/in/ludymilaguimar%C3%A3es13/) | [GitHub](https://github.com/ludysgmila)")

st.markdown("---")

st.markdown("""
Agradecemos a todos que contribuíram para este projeto!
Sua dedicação torna o aprendizado sobre AWS mais acessível e eficaz!
""")