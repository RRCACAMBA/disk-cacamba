# Disk Caçamba — Landing Page para Ads

Landing page estática focada em conversão para São Paulo, com dois caminhos:

1. WhatsApp como CTA principal.
2. Checkout online como alternativa.

## Configuração obrigatória

O projeto já está configurado com:

- WhatsApp: `55 11 92633-6542`
- Checkout: `https://disk-cacamba-production.up.railway.app/`

No `index.html`, adicione seu Google Tag Manager e demais pixels.

## Rodar localmente

```bash
npm start
```

Acesse `http://localhost:3000`.

## Railway

1. Envie esta pasta para um repositório GitHub.
2. Crie um projeto no Railway a partir do repositório.
3. O Railway detectará `npm start` automaticamente.
4. Gere o domínio público e conecte seu domínio próprio.

## Eventos disponíveis no dataLayer

- `page_view_disk_cacamba`
- `click_whatsapp`
- `begin_checkout`
- `faq_open`
- `conversion_choice_modal_view`

## Antes de anunciar

Substitua textos genéricos pelos dados reais da empresa, CNPJ, telefone, regiões efetivamente atendidas, condições comerciais e prazos que possam ser cumpridos.
