# Registro Pesi 🏋️

App per il tracciamento e la progressione dei pesi in palestra.  
**Developed by Mattia Moscuzza**

---

## Struttura dei file

```
Registro Pesi/
├── index.html          ← App completa (HTML + CSS + JS in un unico file)
├── manifest.json       ← Manifest PWA
├── sw.js               ← Service Worker per offline e installazione
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png
│   └── generate-icons.js   ← Script opzionale per generare le icone PNG
└── README.md
```

---

## Utilizzo in locale

Apri `index.html` con un doppio clic nel Finder.  
L'app funziona completamente offline — tutti i dati sono salvati nel `localStorage` del browser.

> **Nota:** Il Service Worker si registra solo quando l'app è aperta da un indirizzo web (`http://` / `https://`), non da `file://`. Nessun errore viene generato in locale.

---

## Pubblicazione su GitHub Pages

### 1. Crea un repository GitHub

```bash
git init
git add .
git commit -m "Prima versione Registro Pesi"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/registro-pesi.git
git push -u origin main
```

### 2. Abilita GitHub Pages

1. Vai su **Settings** del repository
2. Scorri fino a **Pages** nella barra laterale
3. In **Source**, seleziona `Deploy from a branch`
4. Scegli `main` come branch e `/ (root)` come cartella
5. Clicca **Save**

L'app sarà disponibile all'indirizzo:  
`https://TUO_USERNAME.github.io/registro-pesi/`

### 3. Aggiorna `start_url` nel manifest (opzionale)

Se il repository si chiama `registro-pesi`, aggiorna `manifest.json`:
```json
"start_url": "/registro-pesi/index.html"
```

---

## Generare le icone PNG

Le icone PNG sono necessarie per l'installazione come PWA.  
Hai tre opzioni:

### Opzione A — Script Node.js incluso

```bash
cd icons
npm install canvas
node generate-icons.js
```

### Opzione B — Strumento online (consigliato)

1. Vai su [https://realfavicongenerator.net](https://realfavicongenerator.net)
2. Carica un'immagine quadrata con il tuo logo (sfondo viola `#6c63ff`, bilanciere bianco)
3. Genera e scarica il pacchetto
4. Metti i file PNG nella cartella `icons/` con i nomi corretti

### Opzione C — Crea manualmente

Crea immagini PNG quadrate con:
- **Sfondo:** `#6c63ff` (viola)
- **Icona:** bilanciere bianco centrato
- **Margine:** ~15% su ogni lato per la zona "safe area" maskable

---

## Formato di esportazione dati

Il file JSON esportato contiene:
```json
{
  "version": 2,
  "exportDate": 1234567890,
  "profile": { "name": "...", "disclaimerAccepted": true, "setupDone": true },
  "settings": { "theme": "dark", "unit": "kg", "backupReminderDays": 30, "notificationsEnabled": false },
  "workouts": [...],
  "sessions": [...],
  "prRecords": { "esercizioId": { "weight": 100, "date": 1234567890 } },
  "lastBackupReminder": 1234567890
}
```

---

## Sicurezza e privacy

- Nessun dato viene inviato a server esterni
- Tutti i dati restano nel `localStorage` del dispositivo
- Il codice non contiene chiavi API, password o token
- La Content Security Policy blocca risorse esterne
- L'input dell'utente non viene mai iniettato come HTML raw (anti-XSS)
- I pesi sono salvati internamente sempre in **kg** e convertiti in **lb** solo a schermo

---

## Compatibilità

| Funzionalità | Android | iPhone (Safari) |
|---|---|---|
| App completa | ✅ | ✅ |
| Timer preciso | ✅ | ✅ |
| Suono timer | ✅ | ✅ (con gesto utente) |
| Vibrazione | ✅ | ❌ (ignorata silenziosamente) |
| Wake Lock | ✅ | ✅ (iOS 16.4+) |
| Installazione PWA | ✅ | ✅ |
| Notifiche sistema | ✅ | ✅ (iOS 16.4+) |
| Funziona in locale | ✅ | ✅ |
