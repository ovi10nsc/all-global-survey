# ALL Global Survey - Website Prezentare Servicii Audit Energetic

Acesta este un website static modern, profesionist și complet responsiv creat pentru **ALL Global Survey**, bazat pe memoriul de activitate al auditorului energetic autorizat **Panainte Iulian Gabriel** (Gradul I, atestat CAA nr. 02471).

## 🌍 Limba și Design
- **Limba:** Română.
- **Design & Culoare:** Tematică "Eco / Sustenabilitate / Verde" (utilizând nuanțe de verde smarald, verde crud, alb și gri deschis), reflectând eficiența energetică, energia regenerabilă și clădirile nZEB.
- **Prețuri:** În conformitate cu cerințele, **toate prețurile au fost eliminate** și înlocuite cu mesaje de tipul **"Cere Ofertă"** sau **"Solicită Cotație"** pentru a asigura un parcurs profesional de achiziție.

## ✨ Funcționalități incluse
1. **Navigare Sticky cu indicator activ:** Meniul rămâne în partea de sus la derularea paginii, iar legăturile își schimbă starea activă în funcție de secțiunea vizibilă.
2. **Design Responsive complet:** Interfața se adaptează excelent pe dispozitive mobile, tablete și desktop-uri, având un meniu de navigare tip hamburger optimizat pentru ecrane mici.
3. **Filtrare dinamică Portofoliu:** Utilizatorii pot filtra lucrările de referință (ex. Sediu MAI Tecuci, ISU Ciolpani, Policlinica Sf. Spiridon Iași) pe categorii prin simpla apăsare a unor butoane de selecție.
4. **Formular de Contact și Cotație cu Validare:** Formularul validează în timp real datele introduse (Nume, Email, Telefon conform formatului din România, consimțământ date) și afișează mesaje de eroare specifice.
5. **Fereastră Modală (Success Popup):** La trimiterea cu succes a formularului, este afișată o animație de confirmare cu detaliile înregistrate, fără a reîncărca pagina.
6. **Integrare directă WhatsApp, Telefon și Email:** Butoane rapide de contact pentru o legătură directă și simplă.

## 📂 Structura Proiectului
```text
/all-global-survey-site
│
├── index.html                  # Structura semantică HTML5 a paginii unice (Landing Page)
├── css/
│   └── style.css               # Designul vizual complet realizat în Vanilla CSS (fără librării externe)
├── js/
│   └── main.js                 # Logica de interactivitate, filtrare portofoliu și validare formular
│
├── Dockerfile                  # Configurația pentru containerizarea aplicației cu Nginx
├── nginx.conf                  # Server-ul web Nginx pre-configurat cu compresie Gzip și cache active
├── .dockerignore               # Fișiere excluse din build-ul Docker
│
├── .github/
│   └── workflows/
│       └── pages.yml           # Integrare continuă pentru deployment automat pe GitHub Pages
│
└── README.md                   # Documentația curentă a proiectului
```

## 🚀 Cum se utilizează

### Opțiunea 1: Rulare locală directă (Simplu)
Poți deschide direct fișierul `index.html` în orice browser modern (Chrome, Firefox, Safari, Edge) sau poți utiliza o extensie de tip "Live Server" din VS Code pentru o experiență optimă.

### Opțiunea 2: Rulare în container Docker (Recomandat pentru producție)
Asigură-te că ai Docker instalat și pornit, apoi deschide terminalul în folderul proiectului și execută:

1. **Construirea imaginii Docker:**
   ```bash
   docker build -t all-global-survey-site .
   ```

2. **Rularea containerului:**
   ```bash
   docker run -d -p 8080:80 --name all-global-survey all-global-survey-site
   ```

3. **Accesarea site-ului:**
   Deschide browser-ul și accesează [http://localhost:8080](http://localhost:8080).

### Opțiunea 3: Deployment pe GitHub Pages
Proiectul este pre-configurat pentru a rula pe GitHub Pages utilizând GitHub Actions:
1. Creează un nou repository pe contul tău de GitHub.
2. Încarcă toate fișierele din acest folder pe branch-ul `main` sau `master`.
3. Mergi la repository -> **Settings** -> **Pages**.
4. La **Build and deployment** -> **Source**, selectează **GitHub Actions**.
5. Pagina se va construi și se va publica automat la fiecare push pe branch-ul principal.
