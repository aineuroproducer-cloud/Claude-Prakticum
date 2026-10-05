import re, html, sys
DOCS=[('oferta','oferta.md')]
NAV=[('oferta','Оферта'),('privacy','Политика ПД'),('consent','Согласие на обработку ПД'),('consent-ads','Согласие на рассылки')]
def inline(t):
    t=html.escape(t,quote=False)
    t=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',t)
    return t
for slug,src in DOCS:
    lines=open('legal/'+src if not src.startswith('legal') else src,encoding='utf-8').read().split('\n')
    meta={}
    while lines and re.match(r'^(title|subtitle|date|draft): ',lines[0]):
        k,v=lines.pop(0).split(': ',1); meta[k]=v
    body=[];inlist=False;para=[]
    def flush():
        if para:
            txt='<br>'.join(inline(x) for x in para)
            body.append(f'<p>{txt}</p>'); para.clear()
    for ln in lines:
        s=ln.rstrip()
        if s.startswith('!! - '):
            flush()
            if not inlist: body.append('<ul>'); inlist=True
            body.append(f'<li class="assume">{inline(s[5:])}</li>'); continue
        if s.startswith('- '):
            flush()
            if not inlist: body.append('<ul>'); inlist=True
            body.append(f'<li>{inline(s[2:])}</li>'); continue
        if inlist: body.append('</ul>'); inlist=False
        if not s: flush(); continue
        if s.startswith('## '):
            flush(); body.append(f'<h2>{inline(s[3:])}</h2>'); continue
        if s.startswith('!! '):
            flush(); body.append(f'<p class="assume">{inline(s[3:])}</p>'); continue
        para.append(s)
    flush()
    if inlist: body.append('</ul>')
    cur=' aria-current="page"'
    nav=' '.join('<a href="%s"%s>%s</a>'%(k, cur if k==slug else '', v) for k,v in NAV)
    draft=f'<p class="legal-draft">{inline(meta["draft"])}</p>' if 'draft' in meta else ''
    page=f'''<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>{html.escape(meta["title"])} — практикум по Claude</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body class="legal-page">
  <header class="site-header">
    <a class="brand" href="/"><span class="brand-mark" aria-hidden="true"><span class="spark"></span></span><span>Claude: от новичка до ПРО</span></a>
    <span></span>
    <a class="header-cta" href="/">← На главную</a>
  </header>
  <main class="legal shell">
    <nav class="legal-nav" aria-label="Документы">{nav}</nav>
    <h1>{html.escape(meta["title"])}</h1>
    <p class="legal-sub">{inline(meta.get("subtitle",""))}</p>
    <p class="legal-date">{inline(meta["date"])}</p>
    {draft}
    {"".join(chr(10)+"    "+b for b in body)}
  </main>
  <footer class="shell">
    <a class="brand" href="/"><span class="brand-mark" aria-hidden="true"><span class="spark"></span></span><span>Claude: от новичка до ПРО</span></a>
    <p>ИП Апакидзе К. Ю., ИНН 772608740084</p>
    <a href="/">На главную</a>
  </footer>
</body>
</html>
'''
    open(f'{slug}.html','w',encoding='utf-8').write(page)
    print(slug, len(page))
