# austroPott – Website

Neue Website für das Theater-Trio austroPott (Theater im Dortmunder U).

## Struktur

- `site/` – die neue Website (statisches HTML/CSS/JS, kein Build-Schritt nötig)
- `alte-website/` – Archivkopie der alten Website austropott.de (nur Referenz, nicht bearbeiten)

## Lokal ansehen

```sh
cd site && python3 -m http.server 8000
# dann http://localhost:8000 im Browser öffnen
```

## Inhalte pflegen

- **Termine:** in `site/termine.html` – im Quelltext steht ein auskommentierter
  Beispielblock, der genau zeigt, wie ein Monat samt Vorstellungen eingetragen wird.
- **Neues Stück:** Detailseite in `site/die-stuecke/` anlegen (bestehende Seite als
  Vorlage kopieren) und in Navigation (alle Seiten), Stücke-Übersicht und Startseite verlinken.
- **Ticket-Link:** überall fest auf `https://austropott.tickettoaster.de/produkte`.

## Design

- Farben: Signalrot `#e2001a`, Tiefschwarz, Papierweiß (aus dem Logo abgeleitet)
- Schriften (lokal gehostet, DSGVO-konform): Bricolage Grotesque (Überschriften),
  Source Serif 4 (Fließtext), Courier Prime (Datums-/Meta-Zeilen, Schreibmaschinen-Motiv des Logos)
- Referenzen des Kunden: Mobile-Menü wie residenztheater.de, klare Fotos/Typo wie
  thalia-theater.de, Ticket-Leiste wie komoedie-muenchen.de

## Veröffentlichen

Den **Inhalt** von `site/` ins Webroot des Hosters laden (oder via Netlify/
Cloudflare Pages/GitHub Pages deployen und die Domain austropott.de umziehen).
Die Datei-Pfade entsprechen der alten Website (z. B. `die-stuecke/mephisto.html`),
bestehende Links und Suchmaschinen-Einträge funktionieren also weiter.

## Offene Punkte

- Aktuelle Termine eintragen (Ticketshop war beim Erstellen leer; Spielzeit ab Juni 2026 angekündigt)
- Impressum/Datenschutz vom Betreiber prüfen lassen (neu formuliert, alte Corona-/Wix-Texte entfernt;
  USt-ID war auf der alten Seite nicht ausgefüllt)
- Kontaktformular der alten Seite wurde bewusst durch Telefon/E-Mail ersetzt
  (statische Seite ohne Server-Backend)
