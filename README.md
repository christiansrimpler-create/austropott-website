# austroPott – Website

Website des Theater-Trios austroPott (Theater im Dortmunder U).
Gebaut mit [Eleventy](https://www.11ty.dev), Inhalte pflegbar über
[Sveltia CMS](https://github.com/sveltia/sveltia-cms) unter `/admin/`.

- **Live (Vorschau):** https://christiansrimpler-create.github.io/austropott-website/
- **Redaktion:** https://christiansrimpler-create.github.io/austropott-website/admin/
  (Anleitung: [ANLEITUNG-REDAKTION.md](ANLEITUNG-REDAKTION.md))

## Struktur

- `src/` – Quellcode der Website
  - `_includes/layout.njk` – gemeinsamer Rahmen (Header, Menü, Footer)
  - `_includes/stueck.njk` – Vorlage für Stück-Detailseiten
  - `_data/*.yaml` – **Inhalte** (Termine, Team, Zitate, Preise, Galerie, Archiv, Einstellungen) – das bearbeitet das CMS
  - `stuecke/*.md` – die Stücke (Texte + Metadaten) – ebenfalls CMS-gepflegt
  - `admin/` – Redaktionsoberfläche (Sveltia CMS)
  - `assets/` – CSS, JS, Bilder, lokal gehostete Schriften
- `alte-website/` – Archivkopie der alten Website austropott.de (nur Referenz)
- `_site/` – Build-Ergebnis (nicht eingecheckt)

## Lokal entwickeln

```sh
npm install
npx eleventy --serve   # http://localhost:8080
```

## Veröffentlichung

Jeder Push auf `main` baut und veröffentlicht die Seite automatisch über
GitHub Actions auf GitHub Pages – auch die Speichern-Klicks im CMS lösen
das aus. Zusätzlich baut ein täglicher Cron-Lauf die Seite neu, damit
**vergangene Termine automatisch verschwinden**.

Die URL-Pfade entsprechen der alten Website (z. B. `die-stuecke/mephisto.html`),
bestehende Links funktionieren nach dem Domain-Umzug weiter.

### Umzug auf austropott.de (später)

Domain und E-Mail liegen bei 1blu, die E-Mail (`tickets@austropott.de`, MX
`mail.austropott.de`) darf nicht angetastet werden. Zwei Optionen:

1. **1blu-Webspace (empfohlen):** Build per FTP zu 1blu hochladen
   (GitHub Action mit FTP-Deploy + Secrets). Keine DNS-Änderung nötig.
2. **GitHub Pages mit eigener Domain:** A-/CNAME-Records bei 1blu auf GitHub
   Pages zeigen lassen, MX-Records unverändert lassen.

In beiden Fällen im Workflow `PATH_PREFIX` auf `/` ändern.

## Design

- Farben: Signalrot `#e2001a`, Tiefschwarz, Papierweiß (aus dem Logo abgeleitet)
- Schriften (lokal gehostet, DSGVO-konform): Bricolage Grotesque (Überschriften),
  Source Serif 4 (Fließtext), Courier Prime (Datums-/Meta-Zeilen, Schreibmaschinen-Motiv des Logos)
- Referenzen des Kunden: Mobile-Menü wie residenztheater.de, klare Fotos/Typo wie
  thalia-theater.de, Ticket-Leiste wie komoedie-muenchen.de

## Offene Punkte

- Aktuelle Termine eintragen (Ticketshop war beim Erstellen leer; Spielzeit ab Juni 2026 angekündigt)
- GitHub-Account für den Redakteur anlegen, als Collaborator einladen, Access Token hinterlegen
- Impressum/Datenschutz vom Betreiber prüfen lassen (neu formuliert, alte Corona-/Wix-Texte entfernt;
  USt-ID war auf der alten Seite nicht ausgefüllt)
- Kontaktformular der alten Seite wurde bewusst durch Telefon/E-Mail ersetzt
  (statische Seite ohne Server-Backend)
