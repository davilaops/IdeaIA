// ==========================================
// STORAGE MANAGER
// ==========================================
const StorageManager = {
  // Obter usuários
  getUsers: () => {
    const users = localStorage.getItem("IdeaIA_users")
    return users ? JSON.parse(users) : []
  },

  // Salvar usuários
  saveUsers: (users) => {
    localStorage.setItem("IdeaIA_users", JSON.stringify(users))
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const email = localStorage.getItem("IdeaIA_current_user")
    return email
  },

  // Definir usuário atual
  setCurrentUser: (email) => {
    localStorage.setItem("IdeaIA_current_user", email)
  },

  // Limpar usuário atual
  clearCurrentUser: () => {
    localStorage.removeItem("IdeaIA_current_user")
  },

  // Obter ideias do usuário
  getUserIdeas: (userEmail) => {
    const users = StorageManager.getUsers()
    const user = users.find((u) => u.email === userEmail)
    return user ? user.ideas : []
  },

  // Salvar ideias do usuário
  saveUserIdeas: (userEmail, ideas) => {
    const users = StorageManager.getUsers()
    const userIndex = users.findIndex((u) => u.email === userEmail)
    if (userIndex !== -1) {
      users[userIndex].ideas = ideas
      StorageManager.saveUsers(users)
    }
  },

  // Obter tema
  getTheme: () => {
    return localStorage.getItem("IdeaIA_theme") || "light"
  },

  // Salvar tema
  saveTheme: (theme) => {
    localStorage.setItem("IdeaIA_theme", theme)
  },
}

// ==========================================
// GERADOR DE IDEIAS
// ==========================================
const IdeaGenerator = {
  templates: [
    "Um aplicativo de {keyword} que conecta pessoas interessadas em {keyword}",
    "Plataforma de {keyword} on-demand para profissionais modernos",
    "Marketplace de {keyword} com curadoria personalizada",
    "Serviço de assinatura mensal de {keyword} premium",
    "Consultoria especializada em {keyword} para pequenas empresas",
    "Curso online interativo sobre {keyword} com certificação",
    "Software de gestão de {keyword} baseado em inteligência artificial",
    "Comunidade exclusiva para entusiastas de {keyword}",
    "Assistente virtual especializado em {keyword}",
    "Loja online de produtos sustentáveis relacionados a {keyword}",
    "Podcast e mídia digital focado em {keyword}",
    "Evento virtual internacional sobre {keyword}",
    "App mobile para gerenciar {keyword} de forma prática",
    "Serviço de delivery especializado em {keyword}",
    "Plataforma de networking para profissionais de {keyword}",
    "Sistema de recomendação personalizada de {keyword}",
    "Hub de conteúdo educacional sobre {keyword}",
    "Solução B2B para otimizar processos de {keyword}",
    "Marketplace que conecta freelancers de {keyword} a empresas",
    "Ferramenta SaaS para automação de {keyword}",
  ],

  generate: (keyword) => {
    const cleanKeyword = keyword.trim().toLowerCase()
    const template = IdeaGenerator.templates[Math.floor(Math.random() * IdeaGenerator.templates.length)]
    const idea = template.replace(/{keyword}/g, cleanKeyword)

    return {
      id: Date.now() + Math.random(),
      keyword: cleanKeyword,
      text: idea,
      date: new Date().toISOString(),
      favorited: false,
    }
  },
}

// ==========================================
// UI MANAGER
// ==========================================
const UIManager = {
  elements: {
    loginScreen: document.getElementById("loginScreen"),
    dashboardScreen: document.getElementById("dashboardScreen"),
    loginForm: document.getElementById("loginForm"),
    logoutBtn: document.getElementById("logoutBtn"),
    themeToggle: document.getElementById("themeToggle"),
    generateBtn: document.getElementById("generateBtn"),
    keywordInput: document.getElementById("keywordInput"),
    ideasContainer: document.getElementById("ideasContainer"),
    emptyState: document.getElementById("emptyState"),
    filterBtns: document.querySelectorAll(".filter-btn"),
    sortSelect: document.getElementById("sortSelect"),
  },

  showScreen: (screen) => {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"))
    screen.classList.add("active")
  },

  renderIdeas: (ideas, filter = "all") => {
    const container = UIManager.elements.ideasContainer
    const emptyState = UIManager.elements.emptyState

    // Filtrar ideias
    let filteredIdeas = ideas
    if (filter === "favorites") {
      filteredIdeas = ideas.filter((idea) => idea.favorited)
    }

    // Ordenar ideias
    const sortValue = UIManager.elements.sortSelect.value
    filteredIdeas = UIManager.sortIdeas(filteredIdeas, sortValue)

    if (filteredIdeas.length === 0) {
      container.innerHTML = ""
      emptyState.classList.add("active")
      return
    }

    emptyState.classList.remove("active")
    container.innerHTML = filteredIdeas.map((idea) => UIManager.createIdeaCard(idea)).join("")

    // Adicionar event listeners
    container.querySelectorAll(".idea-favorite").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const ideaId = Number.parseFloat(e.currentTarget.dataset.id)
        App.toggleFavorite(ideaId)
      })
    })

    container.querySelectorAll(".btn-copy").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const text = e.currentTarget.dataset.text
        UIManager.copyToClipboard(text)
      })
    })

    container.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const ideaId = Number.parseFloat(e.currentTarget.dataset.id)
        App.deleteIdea(ideaId)
      })
    })
  },

  createIdeaCard: (idea) => {
    const date = new Date(idea.date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

    return `
            <div class="idea-card">
                <div class="idea-header">
                    <span class="idea-keyword">${idea.keyword}</span>
                    <button class="idea-favorite ${idea.favorited ? "favorited" : ""}" data-id="${idea.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="idea-content">
                    <p class="idea-text">${idea.text}</p>
                    <p class="idea-date">${date}</p>
                </div>
                <div class="idea-actions">
                    <button class="btn btn-small btn-secondary btn-copy" data-text="${idea.text}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copiar
                    </button>
                    <button class="btn btn-small btn-danger btn-delete" data-id="${idea.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Excluir
                    </button>
                </div>
            </div>
        `
  },

  sortIdeas: (ideas, sortValue) => {
    const sorted = [...ideas]

    switch (sortValue) {
      case "date-desc":
        return sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
      case "date-asc":
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
      case "favorites":
        return sorted.sort((a, b) => (b.favorited ? 1 : 0) - (a.favorited ? 1 : 0))
      default:
        return sorted
    }
  },

  copyToClipboard: (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Ideia copiada para a área de transferência!")
    })
  },

  setTheme: (theme) => {
    document.documentElement.setAttribute("data-theme", theme)
    const sunIcon = document.getElementById("sunIcon")
    const moonIcon = document.getElementById("moonIcon")

    if (theme === "dark") {
      sunIcon.style.display = "none"
      moonIcon.style.display = "block"
    } else {
      sunIcon.style.display = "block"
      moonIcon.style.display = "none"
    }
  },
}

// ==========================================
// APPLICATION
// ==========================================
const App = {
  currentUser: null,
  currentFilter: "all",

  init: () => {
    // Aplicar tema salvo
    const savedTheme = StorageManager.getTheme()
    UIManager.setTheme(savedTheme)

    // Verificar se há usuário logado
    const currentUserEmail = StorageManager.getCurrentUser()
    if (currentUserEmail) {
      App.currentUser = currentUserEmail
      UIManager.showScreen(UIManager.elements.dashboardScreen)
      App.loadIdeas()
    } else {
      UIManager.showScreen(UIManager.elements.loginScreen)
    }

    // Event listeners
    UIManager.elements.loginForm.addEventListener("submit", App.handleLogin)
    UIManager.elements.logoutBtn.addEventListener("click", App.handleLogout)
    UIManager.elements.themeToggle.addEventListener("click", App.toggleTheme)
    UIManager.elements.generateBtn.addEventListener("click", App.generateIdea)
    UIManager.elements.keywordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") App.generateIdea()
    })

    UIManager.elements.filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        UIManager.elements.filterBtns.forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")
        App.currentFilter = e.target.dataset.filter
        App.loadIdeas()
      })
    })

    UIManager.elements.sortSelect.addEventListener("change", () => {
      App.loadIdeas()
    })
  },

  handleLogin: (e) => {
    e.preventDefault()
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    const users = StorageManager.getUsers()
    let user = users.find((u) => u.email === email)

    // Se o usuário não existe, criar novo
    if (!user) {
      user = {
        email: email,
        password: password,
        ideas: [],
      }
      users.push(user)
      StorageManager.saveUsers(users)
    } else {
      // Verificar senha
      if (user.password !== password) {
        alert("Senha incorreta!")
        return
      }
    }

    // Login bem-sucedido
    App.currentUser = email
    StorageManager.setCurrentUser(email)
    UIManager.showScreen(UIManager.elements.dashboardScreen)
    App.loadIdeas()
  },

  handleLogout: () => {
    App.currentUser = null
    StorageManager.clearCurrentUser()
    UIManager.showScreen(UIManager.elements.loginScreen)
    document.getElementById("loginForm").reset()
  },

  toggleTheme: () => {
    const currentTheme = StorageManager.getTheme()
    const newTheme = currentTheme === "light" ? "dark" : "light"
    StorageManager.saveTheme(newTheme)
    UIManager.setTheme(newTheme)
  },

  generateIdea: () => {
    const keyword = UIManager.elements.keywordInput.value.trim()

    if (!keyword) {
      alert("Por favor, digite uma palavra-chave!")
      return
    }

    const idea = IdeaGenerator.generate(keyword)
    const ideas = StorageManager.getUserIdeas(App.currentUser)
    ideas.unshift(idea)
    StorageManager.saveUserIdeas(App.currentUser, ideas)

    UIManager.elements.keywordInput.value = ""
    App.loadIdeas()
  },

  loadIdeas: () => {
    const ideas = StorageManager.getUserIdeas(App.currentUser)
    UIManager.renderIdeas(ideas, App.currentFilter)
  },

  toggleFavorite: (ideaId) => {
    const ideas = StorageManager.getUserIdeas(App.currentUser)
    const idea = ideas.find((i) => i.id === ideaId)
    if (idea) {
      idea.favorited = !idea.favorited
      StorageManager.saveUserIdeas(App.currentUser, ideas)
      App.loadIdeas()
    }
  },

  deleteIdea: (ideaId) => {
    if (!confirm("Deseja realmente excluir esta ideia?")) return

    let ideas = StorageManager.getUserIdeas(App.currentUser)
    ideas = ideas.filter((i) => i.id !== ideaId)
    StorageManager.saveUserIdeas(App.currentUser, ideas)
    App.loadIdeas()
  },
}

// Inicializar aplicação
document.addEventListener("DOMContentLoaded", App.init)
