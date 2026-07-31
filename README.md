# Disk Caçamba — Landing Page para Ads

Landing page responsiva focada em Google Ads para São Paulo.

## Configuração
Edite `config.js` para alterar WhatsApp ou checkout.

## Publicação no Railway
O projeto usa Node/Express. O Railway executa automaticamente `npm start`.

## Rastreamento
A página preserva UTM, `gclid`, `gbraid` e `wbraid` no navegador e encaminha esses parâmetros para o checkout. Eventos enviados ao `dataLayer`:
- `whatsapp_click`
- `checkout_click`
- `checkout_size_click`

## Arquivos principais
- `index.html`
- `styles.css`
- `script.js`
- `config.js`
- `server.js`
- `hero-disk-cacamba.webp`, `cacambas-modelos.webp` e `caminhao-disk-cacamba.webp` na raiz do projeto
