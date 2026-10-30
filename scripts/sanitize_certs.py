import os
import re
import shutil
import fitz  # PyMuPDF
from PIL import Image

BASE_DIR = r"c:\Users\victo\Desktop\Curriculo"
CERTS_SOURCE_DIR = os.path.join(BASE_DIR, "certificados")
TARGET_DIR = os.path.join(BASE_DIR, "portfolio-web", "assets", "certificados")

os.makedirs(TARGET_DIR, exist_ok=True)

# Mapeamento dos 25 documentos únicos
CERT_MAPPINGS = [
    # 1. Artigos e Produção Científica
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Apresentação.pdf"),
        "target": "artigo-venjp-insumo-produto-2025.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Certificado de Autoria.pdf"),
        "target": "artigo-enecomat-quantum-carbon-policy-2025.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Certificado de Autoria 02.pdf"),
        "target": "artigo-enecomat-digital-inclusion-quantum-gap-2025.pdf",
    },

    # 2. Pesquisa e Iniciação Científica
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Index - PROPEq.pdf"),
        "target": "iniciacao-cientifica-vic-propesq-ufmt-2025-2026.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Projeto de pesquisa.pdf"),
        "target": "projeto-pesquisa-precos-terras-mt-propeq-75-2024.pdf",
        "redact_address": True
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Projeto de pesquisa 02.pdf"),
        "target": "projeto-pesquisa-insumo-produto-propeq-74-2025.pdf",
        "redact_address": True
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "SEI_8432342_Declaracao-2.pdf"),
        "target": "declaracao-sei-ufmt-projetos-pesquisa-extensao.pdf",
    },

    # 3. Extensão e Organização de Eventos
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Conjuntura.pdf"),
        "target": "extensao-dialogos-conjuntura-economica-195h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Certificado de Extensão.pdf"),
        "target": "extensao-facil-consultoria-facil-summit-120h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Eventos oficias.pdf"),
        "target": "organizacao-eventos-60-anos-economia-ufmt-100h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Curso de Extenção.pdf"),
        "target": "organizacao-extensao-xviii-enecomat-2025.pdf",
    },

    # 4. Cursos: IA, Economia, Finanças e Dados
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Curso de Curta Duração.pdf"),
        "target": "curso-ia-aplicada-regressao-economia.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Curso de curta duração 02.pdf"),
        "target": "escola-verao-analise-insumo-produto-ufrj-abein-40h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Curso de Extensão 02.pdf"),
        "target": "curso-investimento-mercado-financeiro-ufmt-36h.pdf",
    },
    {
        "src": os.path.join(BASE_DIR, "certificado (2).pdf"),
        "target": "curso-modelagem-macroeconomica-excel-r-ufmt-15h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "curso de curta duração 03.pdf"),
        "target": "oficina-estatistica-economica-ufmt-15h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Certificado de Curso de Curta duração.pdf"),
        "target": "curso-teoria-dos-jogos-classicos-quanticos-10h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Não vale (3).PDF"),
        "target": "curso-microsoft-word-fundacao-bradesco-9h.pdf",
    },

    # 5. Congressos, Seminários e Workshops
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Eventos cienfico da area 2.pdf"),
        "target": "evento-cidades-inovadoras-seciteci-mt-20h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "evento cientifico da area.pdf"),
        "target": "semana-economista-ueg-12h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Certificado de Extensão 02.pdf"),
        "target": "semana-economia-ufr-11h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Não vale (4).pdf"),
        "target": "seminario-nupes-ufmt-ferrovia-tributacao-6h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Não vale.png"),
        "target": "workshop-recrutamento-selecao-facc-ufmt-6h.png",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Não vale (5).pdf"),
        "target": "palestra-rumo-ao-emprego-perspectiva-galega-ufmt-4h.pdf",
    },
    {
        "src": os.path.join(CERTS_SOURCE_DIR, "Não vale.pdf"),
        "target": "palestra-educacao-financeira-enef-sicoob-ufmt-1h.pdf",
    }
]

# Regex de CPF (pontuado ou não) e RGA
CPF_PATTERN = re.compile(r"\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b")
RGA_PATTERN = re.compile(r"\b(RGA|Matrícula|matrícula)[\s:]*([0-9\.\-]+)\b", re.IGNORECASE)

def sanitize_pdf(src_path, dst_path, redact_address=False):
    doc = fitz.open(src_path)
    redacted_count = 0
    for page_idx, page in enumerate(doc):
        text = page.get_text()
        
        # 1. Buscar CPFs
        for match in CPF_PATTERN.finditer(text):
            cpf_str = match.group(0)
            rects = page.search_for(cpf_str)
            for r in rects:
                expanded = fitz.Rect(r.x0 - 2, r.y0 - 2, r.x1 + 2, r.y1 + 2)
                page.add_redact_annot(expanded, text="[DADO PROTEGIDO]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=8, text_color=(1, 1, 1))
                redacted_count += 1
        
        # 2. Buscar RGAs / matrículas
        for match in RGA_PATTERN.finditer(text):
            rga_full = match.group(0)
            rects = page.search_for(rga_full)
            for r in rects:
                expanded = fitz.Rect(r.x0 - 2, r.y0 - 2, r.x1 + 2, r.y1 + 2)
                page.add_redact_annot(expanded, text="[DADO PROTEGIDO]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=8, text_color=(1, 1, 1))
                redacted_count += 1
        
        # 3. Proteção Específica de Endereço Residencial (Ficha PROPeq)
        if redact_address and page_idx == 0:
            # Termos textuais específicos de endereço residencial
            addr_terms = ["RUA SAO FRANCISCO", "SAO FRANCISCO", "PICO DO AMOR", "78008095"]
            for term in addr_terms:
                rects = page.search_for(term)
                for r in rects:
                    expanded = fitz.Rect(r.x0 - 2, r.y0 - 2, r.x1 + 2, r.y1 + 2)
                    page.add_redact_annot(expanded, text="[ENDEREÇO PROTEGIDO]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=7.5, text_color=(1, 1, 1))
                    redacted_count += 1
            
            # Tarja cirúrgica cobrindo os campos de valor de Endereço, Bairro e CEP/Cidade/Telefone na Ficha PROPeq
            # Linha Rua: x [28, 350], y [156, 170]
            page.add_redact_annot(fitz.Rect(28, 156, 350, 170), text="[ENDEREÇO PROTEGIDO]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=7.5, text_color=(1, 1, 1))
            # Linha Bairro: x [362, 560], y [156, 170]
            page.add_redact_annot(fitz.Rect(362, 156, 560, 170), text="[BAIRRO PROTEGIDO]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=7.5, text_color=(1, 1, 1))
            # Linha CEP/Cidade/Fone: x [28, 560], y [179, 193]
            page.add_redact_annot(fitz.Rect(28, 179, 160, 193), text="[CEP PROTEGIDO]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=7.5, text_color=(1, 1, 1))
            page.add_redact_annot(fitz.Rect(175, 179, 310, 193), text="[CIDADE PROTEGIDA]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=7.5, text_color=(1, 1, 1))
            page.add_redact_annot(fitz.Rect(320, 179, 560, 193), text="[TELEFONE PROTEGIDO]", fill=(0.12, 0.16, 0.25), fontname="helv", fontsize=7.5, text_color=(1, 1, 1))
            redacted_count += 5
        
        page.apply_redactions()
    
    doc.save(dst_path, garbage=4, deflate=True)
    doc.close()
    return redacted_count

def process_all():
    print(f"Iniciando sanitização e cópia dos {len(CERT_MAPPINGS)} certificados únicos...")
    processed = 0
    for item in CERT_MAPPINGS:
        src = item["src"]
        dst = os.path.join(TARGET_DIR, item["target"])
        if not os.path.exists(src):
            print(f"[ERRO] Arquivo de origem não encontrado: {src}")
            continue
        
        redact_addr = item.get("redact_address", False)
        if src.lower().endswith(".pdf"):
            count = sanitize_pdf(src, dst, redact_address=redact_addr)
            print(f"[OK] PDF sanitizado ({count} redações): {item['target']}")
        else:
            # Imagem (PNG)
            shutil.copy2(src, dst)
            print(f"[OK] Imagem copiada: {item['target']}")
        processed += 1
    
    print(f"\nFinalizado com sucesso! {processed}/{len(CERT_MAPPINGS)} arquivos processados em:")
    print(TARGET_DIR)

if __name__ == "__main__":
    process_all()
