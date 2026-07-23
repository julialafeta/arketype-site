# Deploy na Vercel + domínio arketype.com.br

Guia passo a passo. Duas etapas: (1) subir o projeto na Vercel, (2) apontar o
domínio do Registro.br para a Vercel.

---

## 1. Subir o projeto na Vercel

### 1.1. Ter o código no GitHub

O projeto já é um repositório Git. Suba para o GitHub (repo sugerido:
`arketype-site`). Se ainda não existe no GitHub, crie um repositório vazio e:

```bash
git remote add origin git@github.com:<seu-usuario>/arketype-site.git
git push -u origin main
```

(Neste ambiente o trabalho está na branch `claude/arketype-nextjs-blog-442aoc`;
depois de revisar, faça o merge para `main` — é `main` que a Vercel vai publicar.)

### 1.2. Importar na Vercel

1. Entre em <https://vercel.com> e faça login com o GitHub.
2. **Add New… → Project** e selecione o repositório `arketype-site`.
3. A Vercel detecta **Next.js** automaticamente. Não precisa mudar nada:
   - Framework Preset: **Next.js**
   - Build Command: `next build` (padrão)
   - Output: gerenciado pela Vercel
   - Nenhuma variável de ambiente é necessária.
4. Clique em **Deploy**. Em ~1 minuto você recebe uma URL de teste, algo como
   `arketype-site.vercel.app`. Abra `…/catalogo` para conferir.

A partir daqui, **todo push para `main` publica automaticamente**. Pull requests
ganham uma URL de preview.

---

## 2. Apontar arketype.com.br (Registro.br) para a Vercel

### 2.1. Adicionar o domínio na Vercel

1. No projeto, vá em **Settings → Domains**.
2. Digite `arketype.com.br` e clique **Add**.
3. Adicione também `www.arketype.com.br` (a Vercel sugere e configura o redirect
   de um para o outro; recomendo o **apex** `arketype.com.br` como principal).
4. A Vercel vai mostrar os **registros DNS exatos** que ela quer. Devem ser os
   valores abaixo — use os que a tela da Vercel exibir se houver diferença.

### 2.2. Criar os registros no Registro.br

No painel do Registro.br: entre em <https://registro.br>, abra o domínio
`arketype.com.br` e vá em **DNS → Editar Zona** (o Registro.br precisa estar
usando os DNS dele, que é o padrão).

Crie **dois** registros:

| Tipo  | Nome / Host | Valor / Dados            | TTL   |
|-------|-------------|--------------------------|-------|
| `A`     | `@` (deixe em branco = raiz) | `76.76.21.21`          | 3600  |
| `CNAME` | `www`       | `cname.vercel-dns.com.`  | 3600  |

Notas:
- **`@` / raiz:** no Registro.br o campo de nome do domínio raiz costuma ficar
  **vazio**. Esse `A` é o que faz `arketype.com.br` (sem www) funcionar.
- **`www` como CNAME** aponta para `cname.vercel-dns.com` (com o ponto final).
- Não é possível usar CNAME na raiz (limitação de DNS) — por isso a raiz usa `A`.
- Salve a zona. **Confirme na tela da Vercel** se `76.76.21.21` é o IP indicado;
  a Vercel é a fonte da verdade e às vezes mostra um IP/registro diferente.

### 2.3. (Alternativa) Delegar os nameservers para a Vercel

Se preferir que a Vercel gerencie todo o DNS (mais simples a longo prazo), em vez
dos registros acima você troca os **nameservers** no Registro.br para os que a
Vercel indicar, tipicamente:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

No Registro.br isso fica em **DNS → Alterar servidores DNS**. Use **ou** os
registros A/CNAME (2.2) **ou** os nameservers (2.3), nunca os dois.

### 2.4. Esperar a propagação

Propaga em geral em minutos, podendo levar até algumas horas. Quando a Vercel
mostrar o domínio como **Valid Configuration**, o HTTPS (certificado) é emitido
automaticamente. Pronto: `https://arketype.com.br/catalogo` no ar.

---

## Checklist rápido

- [ ] `npm run build` passa localmente
- [ ] Código no GitHub, branch `main`
- [ ] Projeto importado na Vercel (deploy verde)
- [ ] `arketype.com.br` e `www` adicionados em Settings → Domains
- [ ] Registro `A @ → 76.76.21.21` criado no Registro.br
- [ ] Registro `CNAME www → cname.vercel-dns.com.` criado
- [ ] Vercel mostra “Valid Configuration” e certificado emitido
