# ValidaHora - Sistema para cadastro e avaliação de horas complementares
Sistema no qual estudantes podem cadastrar pedidos de horas complementares e coordenadores podem avaliá-los, aceitando ou rejeitando um pedido com base nos baremas de cada curso (LC, SI e CC).

## Descrição

<p align="center">
  <img src="https://pbs.twimg.com/profile_images/1803087065279561728/Pb2Jf5qg_400x400.jpg"/> <br>  <br>
  Projeto desenvolvido como parte da disciplina <b>MATD02- Tópicos em Sistemas de Informação e Web</b> na UFBA, com o objetivo de criar um sistema para cadastro e validação de pedidos de horas complementares para os cursos do Instituto de Computação da UFBA. O sistema permitirá o cadastro, aprovação ou rejeição de um pedido, exportação de um pedido para um arquivo de texto e visualização de horas já realizadas por cada aluno, entre outras funcionalidades.
</p>

## Tecnologias Utilizadas
- **Back-end**: NodeJS com Express
- **Front-end**: React
- **Banco de Dados**: PostgreSQL - <a href="https://tembo.io" target="_blank">Hospedagem PostgreSQL gratuita</a>
- **Cloud**: <a href="https://render.com" target="_blank">Render</a>  ou <a href="https://fly.io" target="_blank">Fly</a> 

## Requisitos do Sistema
Os requisitos completos do sistema estão detalhados no link abaixo:

- Link para os Requisitos: <a href="https://docs.google.com/document/d/1Z32zjK3VSAu5rSDCpFZb4ei8UcoqC9aEbYtabFV7LGA/" target="_blank">Requisitos do Sistema</a>

## Protótipo 
Os protótipos do sistema estão detalhados nos links abaixo, na versão criada inicialmente em mobile e para wev:

- Link para a versão mobile: <a href="https://marvelapp.com/prototype/7h93bh3" target="_blank">Protótipo Mobile</a>
- Link para a versão web: <a href="https://www.figma.com/design/bR8RcJPJw17U3qxbaLH3hn" target="_blank">Protótipo Web</a>

## Como Executar o Projeto 

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/carlosmcnt/valida-hora.git
   cd valida-hora
   ```
2. **Instalar Dependências**:
   ```bash
   npm install
   ```
3. **Executar o Back-end**:
   ```bash
   cd backend
   npm run start // Ambiente final
   --- ou ---
   npm run dev // Desenvolvimento
   ```

Obs.: As variáveis de ambiente estarão sem valor atribuído. As informações sensíveis devem ser solicitadas ao desenvolvedores para criação de servidor e acesso ao banco localmente.

## Equipe
- **Carlos Mosselman Cabral Neto** - [carlos.mosselman@ufba.br]
- **Iasmim da Cruz Marinho** - [iasmimcm@ufba.br]
- **Vanessa Machado Araújo** - [vanessa.machado@ufba.br]

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).
