cat << 'EOF' > README.md
## 💡 BizSpark - Gerador de Ideias de Negócio

Um gerador de ideias de negócio simples e intuitivo, construído com foco em usabilidade e experiência do usuário (UX).

---

## ✨ Recursos

O BizSpark permite aos usuários:

* **Autenticação Simples:** Login/Cadastro automático (as credenciais são criadas automaticamente se o email for novo).
* **Geração de Ideias:** Gere ideias de negócio criativas com base em uma **palavra-chave** inserida pelo usuário, utilizando templates de geração.
* **Gestão de Ideias:** As ideias geradas são salvas no **Armazenamento Local** (`localStorage`) do navegador, associadas ao usuário logado.
* **Favoritos:** Marque ideias como favoritas para acesso rápido.
* **Filtragem e Ordenação:**
    * Filtre ideias por **Todas** ou **Favoritas**.
    * Ordene ideias por data (**Mais recentes** ou **Mais antigas**) ou por **Favoritas primeiro**.
* **Ações Rápidas:** Copie o texto da ideia para a área de transferência ou exclua ideias facilmente.
* **Alternância de Tema:** Suporte para temas **Claro** e **Escuro**, salvos por preferência do usuário.
* **Interface Responsiva:** O design se adapta a diferentes tamanhos de tela (desktop e mobile).

---

## 💻 Tecnologias

O projeto é um aplicativo web **Full-Stack JavaScript** com foco no front-end, utilizando o *Local Storage* para simular a persistência de dados.

### Frontend
* **HTML5**
* **CSS3** (Estilização com Variáveis CSS e Media Queries para temas e responsividade)
* **JavaScript (Vanilla JS)** (Para toda a lógica de aplicação, manipulação de DOM e gestão de estado)
* **Fontes:** Inter

### Ferramentas de Desenvolvimento
O projeto está configurado como um aplicativo **Next.js** em desenvolvimento, embora a lógica principal esteja em HTML/CSS/JS simples.

* `next` (v16.0.0)
* `react` / `react-dom` (v19.2.0)
* **Estilização/UI:**
    * `tailwindcss` (v4.1.9)
    * `lucide-react` (Ícones)
    * Componentes Radix UI (Pacotes `@radix-ui/*`)
* **Outras libs:** `zod`, `react-hook-form`, `date-fns`, `next-themes`

---

## 🚀 Como Rodar Localmente

O projeto está configurado como um projeto Next.js.

### Pré-requisitos
Certifique-se de ter o **Node.js** e o **npm** (ou yarn/pnpm) instalados.

### 1. Clonar o Repositório

```bash
git clone [URL_DO_SEU_REPOSITÓRIO]
cd my-v0-project

2. Instalar Dependências
Instale todas as dependências listadas no package.json:

Bash

npm install
# ou yarn install
# ou pnpm install
3. Executar o Servidor de Desenvolvimento
Para iniciar o aplicativo no modo de desenvolvimento, use o script dev:

Bash

npm run dev
# ou yarn dev
# ou pnpm dev
O aplicativo estará acessível na porta padrão do Next.js.

