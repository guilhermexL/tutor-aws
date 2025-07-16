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
Responsável pela arquitetura geral da aplicação, integração da LLM com LangChain
e desenvolvimento da interface Streamlit. Apaixonado(a) por LLMs e infraestrutura em nuvem.
""")
st.markdown("🌐 [Seu LinkedIn](https://linkedin.com/in/seulinkedin)")
st.markdown("🐙 [Seu GitHub](https://github.com/seugithub)")

st.markdown("---")

st.subheader("Guilherme Santos")
st.write("""
Contribuiu com o conhecimento técnico em AWS, garantindo a precisão das informações
e revisando o conteúdo gerado pela LLM. Essencial para a qualidade do tutor.
""")
st.markdown("🌐 [LinkedIn do Colega](https://linkedin.com/in/linkedin_colega)")
st.markdown("🐙 [GitHub do Colega](https://github.com/github_colega)")

st.markdown("---")

st.subheader("José Alan")
st.write("""
Contribuiu com o conhecimento técnico em AWS, garantindo a precisão das informações
e revisando o conteúdo gerado pela LLM. Essencial para a qualidade do tutor.
""")
st.markdown("🌐 [LinkedIn do Colega](https://linkedin.com/in/linkedin_colega)")
st.markdown("🐙 [GitHub do Colega](https://github.com/github_colega)")

st.markdown("---")

st.subheader("Ludy Mila Guimarães")
st.write("""
Contribuiu com o conhecimento técnico em AWS, garantindo a precisão das informações
e revisando o conteúdo gerado pela LLM. Essencial para a qualidade do tutor.
""")
st.markdown("🌐 [LinkedIn do Colega](https://linkedin.com/in/linkedin_colega)")
st.markdown("🐙 [GitHub do Colega](https://github.com/github_colega)")

st.markdown("""
Agradecemos a todos que contribuíram para este projeto!
Sua dedicação torna o aprendizado sobre AWS mais acessível e eficaz.
""")
st.info("Interessado em contribuir? Fale conosco!")