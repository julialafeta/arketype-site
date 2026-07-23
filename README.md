# ARKETYPE

Projeto editorial de análise de marcas de moda. Site em **Next.js (App Router)**,
preparado para deploy na **Vercel** e domínio **arketype.com.br**.

Nesta primeira versão o site é o **blog / Catálogo**:

- `/catalogo` — home do Catálogo, lista os artigos (cada artigo é uma marca).
- `/catalogo/[marca]` — o artigo, renderizado por um **template reutilizável** a
  partir de um arquivo `.mdx`.

O design (tipografia, cores, cabeçalho ARKETYPE, grids de imagem) foi extraído do
export do Claude Design e vive **inteiramente no template**. Publicar um artigo
novo é só criar um `.mdx` — você nunca mexe em HTML ou layout.

---

## Rodar localmente

```bash
npm install
npm run dev       # http://localhost:3000  (redireciona para /catalogo)
```

Build de produção (o que a Vercel roda):

```bash
npm run build
npm run start
```

---

## Publicar um artigo novo (o fluxo do dia a dia)

1. Crie `content/catalogo/<marca>.mdx` (ex.: `content/catalogo/miu-miu.mdx`).
   O nome do arquivo vira a URL: `/catalogo/miu-miu`.
2. Coloque as imagens em `public/catalogo/<marca>/`.
3. Escreva o texto usando os componentes abaixo.
4. `git add . && git commit -m "artigo: miu miu" && git push`. A Vercel publica
   sozinha.

A maneira mais rápida de começar é **duplicar `content/catalogo/loewe.mdx`** e
trocar o conteúdo.

### Frontmatter (topo do arquivo, entre `---`)

```yaml
---
brand: Loewe                       # nome da marca (aparece no hero e nos cards)
title: Como a Loewe aprendeu a ser estranha
heroLines:                         # o título quebrado em linhas, para o hero
  - Como a Loewe
  - aprendeu
  - a ser
  - estranha
heroImage: hero-runway.png         # imagem de fundo do título (em public/catalogo/loewe/)
cover: cover.png                   # capa usada na listagem /catalogo
excerpt: Uma frase de resumo para o card da listagem.
kicker: Arketype Catalog
dateLabel: 15 JUL 2026
date: "2026-07-15"                 # ISO, usado para ordenar
readingTime: 12 min de leitura
caseNumber: "04"
order: 1                           # menor = aparece primeiro na listagem
published: true                    # false = fica oculto (rascunho)
toc:                               # índice do topo (opcional)
  - { label: Uma misteriosa origem real, year: "1846", href: ch1 }
closing:                           # bloco de reflexão final (fundo grafite)
  eyebrow: Uma última reflexão
  paragraphs:
    - Primeiro parágrafo do fecho.
    - Segundo parágrafo do fecho.
afterword: Parágrafo de despedida, em itálico, abaixo do fecho.
---
```

### Componentes de conteúdo (o corpo do artigo)

Você compõe o artigo com estes blocos. Cada um já carrega o design certo.

| Componente | Para quê |
|---|---|
| `<Intro label="INTRO">` | Abertura. Dentro dela, `<Lede>` é o parágrafo grande; os parágrafos seguintes são texto normal. |
| `<Chapter n="01" kicker="As origens" total={6} id="ch1">` | Um capítulo. `id` é a âncora do índice. |
| `<Split figure="right" tall>` | Cabeçalho do capítulo em duas colunas (texto + imagem). Use `figure="left"`, `even`, `tall`. |
| `<Text>` … `</Text>` | A coluna de texto do `Split`. |
| `<Heading>` / `<Heading wide>` | O título grande do capítulo. |
| `<Lead>` / `<Lead spaced>` | Frase de destaque (sans-serif). |
| `<MiniQuote>` | Citação curta em caixa-alta, com aspa decorativa. |
| `<Figure caption="FIG. 01 · …" captionTop single>` | Moldura de imagem. `single` = uma imagem; sem `single` = recebe um `<Grid>`. |
| `<Grid cols={3} rows={3}>` | Grade de imagens. Dentro vão os `<Slot>`. |
| `<Slot img="runway-01.png" label="Look 01" />` | Uma célula. Com `img`, mostra a imagem (de `public/catalogo/<marca>/`). Sem `img`, mostra um **placeholder** com o `label` — troque depois. |
| `<Columns n={3}>` | Corpo em 2 ou 3 colunas. Escreva parágrafos normais (linha em branco entre eles). |
| `<PullQuote cite="FONTE">` | Citação em destaque dentro do corpo. |
| `<Lexicon title="…" fig="FIG. 04">` + `<LexCard n="01" label="…" img="…">` | Fileira de cards (ex.: os “pilares”). |
| `<People>` + `<Person name="Rihanna">` | Tabela de pessoas / celebridades. |
| `<PullWide>` | Parágrafo largo de fechamento de um capítulo. |

**Imagens:** dentro do MDX você referencia só o nome do arquivo
(`img="runway-01.png"`); o template resolve para `/catalogo/<marca>/runway-01.png`.
Para trocar uma imagem, substitua o arquivo em `public/catalogo/<marca>/` — o MDX
não muda. Onde você ainda não tem a imagem, deixe o `<Slot label="…">` sem `img`:
aparece um placeholder cinza com a legenda, e o layout fica idêntico ao final.

O `content/catalogo/loewe.mdx` é a referência completa de todos os blocos.

---

## Estrutura do projeto

```
app/
  layout.tsx                 # <html>, fontes, CSS global, metadata
  page.tsx                   # / → redireciona para /catalogo
  catalogo/
    page.tsx                 # home do Catálogo (listagem)
    [marca]/page.tsx         # rota dinâmica do artigo (compila o MDX)
components/article/          # o TEMPLATE (hero, header, MDX components, etc.)
content/catalogo/            # os artigos (.mdx) — é aqui que você escreve
lib/articles.ts             # lê os .mdx e o frontmatter
public/
  catalogo/<marca>/          # imagens de cada artigo
  fonts/  logos/             # fontes e logotipos
styles/                      # tokens de marca + CSS do template
```

## Fontes

Auto-hospedadas em `public/fonts` (sem requisições externas). As fontes de marca
(Instrument Serif, Suisse Intl, Space Mono, Archivo, Unbounded) vêm do design
system. O serif de leitura é **EB Garamond** (OFL), no lugar do “Jannon” do export
original, que não foi fornecido. Licença em `public/fonts/EBGaramond-OFL.txt`.

---

## Deploy na Vercel + domínio (Registro.br)

Veja o passo a passo detalhado em [`DEPLOY.md`](./DEPLOY.md).
