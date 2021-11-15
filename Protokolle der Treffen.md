# Fortgeschrittenenpraktikum ChronicleDB Admin Panel
Im Folgenden sind die Protokolle unserer kleineren Treffen festgehalten.




## Besprechung vom 28.10.21
Anwesend: Lars Happel, Johannes Buder, Davit Davtyan

### Entscheidung für ein Framework/Library zur Entwicklung
Nach googeln bzgl. verschiedener Möglichkeiten haben wir uns für Angular entschieden.

### Grobe Planung der Vorgehensweise bis zum ersten Meilenstein
Zunächst wollen wir uns mit Angular und Typescript vertraut machen. Hierfür haben wir verschiedene Tutorials herausgesucht. Des Weiteren suchen wir Material zur REST-API heraus.

### Planung für die kommende Woche
- weitere Tutorials schauen und nachprogrammieren
- Wissen über Bootstrap und Angular Material aneignen → Entscheidung in naher Zukunft

### Sonstiges
- Einrichtung von GitHub für Gruppenmitglieder und Tutor




## Treffen vom 05.11.21
Anwesend: Davit Davtyan, Johannes Buder

### ChronicleDB testen
Wir haben gemeinsam ChronicleDB "installiert" und mit Postman einige Anfragen ausprobiert, um herauszufinden, auf was wir im Code achten müssen (Antworten, Codes, ...).

### Planung
Wir wollen mit ChronicleDB im Code kommunizieren und die Anfragen, die wir in Postman gemacht haben übertragen. Ebenso wollen wir uns Designs für die Website überlegen.




## Treffen vom 06.11.21
Anwesend: Lars Happel, Johannes Buder

### ChronicleDB testen
Wir haben gemeinsam ChronicleDB "installiert" und mit Postman einige Anfragen ausprobiert, um herauszufinden, auf was wir im Code achten müssen (Antworten, Codes, ...).

### Planung
Wir wollen mit ChronicleDB im Code kommunizieren und die Anfragen, die wir in Postman gemacht haben übertragen. Ebenso wollen wir uns Designs für die Website überlegen.




## Zwischenzeitige Absprachen
Wir haben uns dazu entschlossen, [Angular Material](https://material.angular.io/) zu verwenden.




## Besprechung vom 10.11.2021
Anwesend: Lars Happel, Johannes Buder, Davit Davtyan

### GUI Design besprechen
Wir haben uns eine Skizze erstellt, wie wir uns die Website vorstellen und angefangen, dies umzusetzen.

### ChronicleDB im Code anfragen
Wir haben bisher immer Fehlermeldungen bekommen, wenn wir anfragen an ChronicleDB stellen. Wir haben beschlossen, bei der Besprechung am Donnerstag dieses Thema nochmal aufzugreifen.




## Besprechung vom 11.11.21
Anwesend: Lars Happel, Johannes Buder, Davit Davtyan

### Entscheidung für Design des GUIs beim Erstellen eines Streams
Wir haben uns dazu entschieden, die Erstellung des Streams (die einzelnen Bestandteile) über mehrere Dropdown-Menüs zu gewährleisten. Damit kann man dann einige Komponenten designen und mit + oder - Buttons einzelne löschen oder hinzufügen. In Zukunft wollen wir vielleicht noch die Reihenfolge nachträglich durch Drag-and-Drop oder Knöpfe manipulierbar machen. Ebenso wollen wir erst später verschachtelte Compounds ermöglichen und zunächst eine einfachere Funktionalität bieten.




## Besprechung vom 15.11.21
Awensend: Johannes Buder, Davit Davtyan, Lars Happel

### GUI Fortschritt
Alle Leute auf den aktuellen Stand gebracht bzgl. der Neuerung, die Davit implementiert hat im GUI. (Dynamisches Erstellen von Komponenten)

### REST-API
Das Python Script zur Weiterleitung der API Anfragen wurde besprochen.

### Weitere Planung
- Mit dem fertigen JSON String fuer den Body des Create Stream requests soll eine Weiterleitung ueber das Python Script eingerichtet werden
- Stream-Properties Compressor Eigenschaften muessen noch korrekt implementiert werden