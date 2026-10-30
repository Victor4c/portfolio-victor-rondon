/**
 * Lógica do Portfólio Web
 * Victor Gabriel de Sales Rondon
 */

let activeCategory = "todos";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  renderMetrics();
  renderProjects();
  renderCertTabs();
  renderCertificates();
  renderExperience();
  setupSearch();
});

// 1. Renderiza Métricas do Perfil
function renderMetrics() {
  const container = document.getElementById("metrics-container");
  if (!container || !PORTFOLIO_DATA.profile.metrics) return;

  container.innerHTML = PORTFOLIO_DATA.profile.metrics.map(m => `
    <div class="metric-card">
      <div class="metric-val">${m.value}</div>
      <div class="metric-label">${m.label}</div>
      <div class="metric-sub">${m.sub}</div>
    </div>
  `).join("");
}

// 2. Renderiza Cards de Projetos (Layout Limpo & Foco em Impacto)
function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.projects.map(p => {
    const mainTechs = p.techStack.slice(0, 4);
    const extraCount = p.techStack.length - mainTechs.length;

    return `
    <article class="project-card">
      <div class="project-card-top">
        <div class="project-meta">
          <span class="project-category">${p.category}</span>
          <span class="project-badge">${p.badge}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        
        ${p.impact ? `
          <div class="project-impact-box">
            <span class="impact-label">Impacto</span>
            <p class="impact-text">${p.impact}</p>
          </div>
        ` : ''}

        <p class="project-summary">${p.summary}</p>
      </div>

      <div class="project-card-bottom">
        <div class="project-techs">
          ${mainTechs.map(t => `<span class="tech-tag">${t}</span>`).join("")}
          ${extraCount > 0 ? `<span class="tech-tag tech-tag-more">+${extraCount}</span>` : ''}
        </div>

        <div class="project-footer">
          <button class="btn btn-secondary" onclick="openProjectModal('${p.id}')">
            Ver Detalhes & Implementação
          </button>
          ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="btn btn-primary">Acessar Site ↗</a>` : ''}
        </div>
      </div>
    </article>
  `;
  }).join("");
}

// 3. Renderiza Abas de Categorias de Certificados
function renderCertTabs() {
  const container = document.getElementById("cert-tabs");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.categories.map(c => `
    <button class="tab-btn ${c.key === activeCategory ? 'active' : ''}" onclick="selectCategory('${c.key}')">
      <span>${c.label}</span>
      <span class="tab-count">${c.count}</span>
    </button>
  `).join("");
}

function selectCategory(catKey) {
  activeCategory = catKey;
  renderCertTabs();
  renderCertificates();
}

function setupSearch() {
  const searchInput = document.getElementById("cert-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderCertificates();
  });
}

// 4. Renderiza Certificados com Filtro e Busca (Visual Limpo, Sem Poluição)
function renderCertificates() {
  const container = document.getElementById("certs-container");
  if (!container) return;

  const filtered = PORTFOLIO_DATA.certificates.filter(c => {
    const matchCategory = (activeCategory === "todos" || c.category === activeCategory);
    const textCorpus = `${c.title} ${c.subtitle} ${c.institution} ${c.tags.join(" ")}`.toLowerCase();
    const matchSearch = !searchQuery || textCorpus.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        Nenhum certificado encontrado para o termo pesquisado.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(c => {
    const topTags = c.tags.slice(0, 3);
    return `
    <div class="cert-card">
      <div>
        <div class="cert-card-header">
          <span class="cert-badge-type">${formatCategoryBadge(c.category)}</span>
          <span class="cert-hours">${c.hours}</span>
        </div>
        <h4 class="cert-card-title">${c.title}</h4>
        <p class="cert-card-sub">${c.subtitle}</p>
        <div class="cert-institution">${c.institution}</div>
      </div>

      <div>
        <div class="cert-tags-row">
          ${topTags.map(t => `<span class="tech-tag tech-tag-sm">${t}</span>`).join("")}
        </div>
        <div class="cert-card-footer">
          <span class="cert-date">${c.date}</span>
          <button class="btn-link" onclick="openCertModal('${c.id}')">
            Ver Certificado ↗
          </button>
        </div>
      </div>
    </div>
  `;
  }).join("");
}

function formatCategoryBadge(cat) {
  const map = {
    "artigos": "Artigo Científico",
    "pesquisa": "Pesquisa",
    "extensao": "Extensão",
    "cursos": "Curso",
    "eventos": "Congresso / Evento"
  };
  return map[cat] || cat;
}

// 5. Renderiza Experiência e Liderança
function renderExperience() {
  const container = document.getElementById("experience-container");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-header">
        <div>
          <div class="timeline-role">${exp.role}</div>
          <div class="timeline-org">${exp.org}</div>
        </div>
        <div class="timeline-period">${exp.period}</div>
      </div>
      <p class="timeline-highlight">${exp.highlight}</p>
      <ul class="timeline-bullets">
        ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

// 6. Modais de Projeto e Certificado
function openProjectModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  document.getElementById("modal-project-title").innerText = project.title;
  
  const body = document.getElementById("modal-project-body");
  body.innerHTML = `
    <div class="modal-section">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
        <span class="project-category">${project.category}</span>
        <span class="project-badge">${project.badge}</span>
      </div>
      <p class="modal-lead">${project.tagline}</p>
      
      ${project.impact ? `
        <div class="project-impact-box" style="margin: 1rem 0;">
          <span class="impact-label">Impacto Principal</span>
          <p class="impact-text">${project.impact}</p>
        </div>
      ` : ''}

      <p style="color: var(--text-muted); font-size: 0.95rem;">${project.summary}</p>
      
      <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1rem;">
        ${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
    </div>

    <div class="modal-section">
      <h4 class="modal-section-title">Como Foi Construído & Arquitetura</h4>
      <div class="modal-steps-grid">
        ${project.architecture.map(a => `
          <div class="modal-step-card">
            <strong class="modal-step-name">${a.step}</strong>
            <p class="modal-step-desc">${a.desc}</p>
          </div>
        `).join("")}
      </div>

      ${project.diagramImage ? `
        <div class="modal-diagram-box">
          <div class="modal-diagram-header">
            <span>Diagrama de Arquitetura do Sistema</span>
            <a href="${project.diagramImage}" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.775rem;">
              Ampliar em Nova Aba ↗
            </a>
          </div>
          <div class="modal-diagram-scroll">
            <img src="${project.diagramImage}" alt="Diagrama de Arquitetura">
          </div>
        </div>
      ` : ''}
    </div>

    ${project.codeSnippet ? `
      <div class="modal-section">
        <h4 class="modal-section-title">Implementação Técnica</h4>
        <pre class="code-preview"><code>${escapeHtml(project.codeSnippet)}</code></pre>
      </div>
    ` : ''}

    <div class="modal-section" style="margin-bottom: 0;">
      <h4 class="modal-section-title">Resultados e Entregas</h4>
      <ul class="timeline-bullets">
        ${project.results.map(r => `<li>${r}</li>`).join("")}
      </ul>
    </div>
  `;

  document.getElementById("project-modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function openCertModal(certId) {
  const cert = PORTFOLIO_DATA.certificates.find(c => c.id === certId);
  if (!cert) return;

  document.getElementById("modal-cert-title").innerText = cert.title;
  document.getElementById("modal-cert-sub").innerText = `${cert.institution} • ${cert.hours} • ${cert.date}`;
  
  const downloadBtn = document.getElementById("modal-cert-download");
  downloadBtn.href = cert.file;

  const content = document.getElementById("modal-cert-content");
  if (cert.fileType === "image") {
    content.innerHTML = `
      <div style="text-align: center; max-height: 72vh; overflow-y: auto;">
        <img src="${cert.file}" alt="${cert.title}" style="max-width: 100%; height: auto; border-radius: 8px;">
      </div>
    `;
  } else {
    content.innerHTML = `
      <iframe src="${cert.file}" class="modal-viewer-frame" title="${cert.title}"></iframe>
    `;
  }

  document.getElementById("cert-modal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    if (modalId === "cert-modal") {
      document.getElementById("modal-cert-content").innerHTML = "";
    }
  }
}

function closeModalOnBackdrop(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
