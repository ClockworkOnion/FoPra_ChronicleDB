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
- Mit dem fertigen JSON String fuer den Body des Create Stream requests soll eine Weiterleitung über das Python Script eingerichtet werden
- Stream-Properties Compressor Eigenschaften muessen noch korrekt implementiert werden




## Besprechung vom 18.11.21
Awensend: Johannes Buder, Davit Davtyan, Lars Happel

### GUI Fortschritt
Vor dem Vorstellen haben wir noch gemainsam die letzten groben GUI-Probleme behoben, Beschreibungen überall hinzugefügt und ein eigenes Theme mit einer Farbpalette erstellt, sodass das Uni Logo auf der Website zusammen mit den Farben von ILIAS etc. (Blau...) auftaucht.

### REST-API
Wir haben uns nochmal das Python Backend angeschaut, dass Lars zum Laufen gebracht hat, sodass wir nun mit ChronicleDB kommunizieren können.

### Weitere Planung
Wir müssen noch ein paar minimale Änderungen an Texten o. ä. vornehmen und die Dokumentation bis Ende der Woche vervollständigen, sodass wir den ersten Meilenstein in der nächsten Zeit abhaken können.  
Ebenso wollen wir schon anfangen, die Komponenten für die anderen Operationen zu erstellen, damit der 2. Meilenstein bald begonnen werden kann.



## Besprechung vom 06.12.21
Awensend: Johannes Buder, Davit Davtyan, Lars Happel

### Login
Zunächst wollen wir ein eigenes Backend erstellen, welches wir mittels einer REST-API ansprechen. Dies wollen wir in den Ferien fertig gestellt haben.
Für die User legen wir dann jeweils ihre Rollen, Berechtigungen und sonstige Daten an. Den Login wollen wir mittels JWT umsetzen und verifizieren.  
Wir planen eine Seite, auf der ein Admin dann die Berechtigungen der Benutzer verwalten und modifizieren kann. Jedoch hat für uns erst mal Priorität, 
dass die Logik und die entsprechende Anzeige funktioniert.

### Max/Min Key
Wir wollen direkt in der Streamliste den Max und Min key anzeigen lassen.




## Mini-Besprechung vom 12.01.22
Awensend: Johannes Buder, Lars Happel

### Login
Wir wollen auf ein Python-Backend umsteigen. Da wir bisher schon mit einer REST-API gearbeitet haben, sollte der Austausch problemlos.
Da die oben erwähnte Logik schon funktioniert, wollen wir nun eine Admin-Verwaltungsseite erstellen und die Login-Seite aufhübschen :)

## Besprechung 13.01.21

### Login/Backend
Ein bisscchen Bugfixing betrieben beim Backend. Das Login funktioniert nun via Backend. Wir haben uns entschlossen auch für die anderen Requests das Backend zu nutzen, damit der Token verifiziert werden kann. Ansonsten wäre die Sicherheitslücke zu groß, da man selbst Web Token generieren könnte und somit die Nutzerverwaltung aushebeln.




## Mini-Besprechung vom 17.01.22
Awensend: Johannes Buder, Davit Davtyan

### Dialoge
Wir wollen verhindern, dass manche Dialoge (TimeTravel) geschlossen werden, wenn man weg klickt.

#### Time Travel
- neues UI machen und anpassen

#### Show Right Flank
- UI hinzufügen (bisher nur Konsole)




## Besprechung vom 20.01.22
Awensend: Johannes Buder, Davit Davtyan, Lars Happel

- Gemeinsames Betrachten der Tabellendarstellung in Time-Travel.
- Erörterung des weiteren Vorgehens zum Verbinden des Backend mit dem Frontend




## Besprechung vom 27.01.22
Awensend: Johannes Buder, Davit Davtyan, Lars Happel

### Show Right Flank
Da Show Right Flank noch nicht fertig im Kontextmenü der Streams ist, wollen wir dies aktuell angehen. 
Dann können wir auch links das Menü "aufrüumen", dass da nicht mehr viel Debug-Zeug angezeigt werden muss.

### Darkmode
Wir haben ebenso nochmal den Darkmode für alle Bereiche umgesetzt und besprochen (Dialoge etc)

### Insert
Wir haben gemerkt, dass zu schnelles einfügen Chronicle überlastet und wir da anhand des Codes noch 
mehr überprüfen müssen. Dies wollen wir nun noch weiter anpassen.

### User Management
Wir haben das Menü bei der Login-Seite aufgeräumt, weitere Beschränkungen eingefügt und weitere Änderungen vorgenommen.

## Spontane Besprechung vom 01.02.22
Awensend: Johannes Buder, Lars Happel

### Jobs
Jobs werden parallel durch das Frontend und Backend verwaltet. Das Backend führt periodisch Anfragen an die Datenbank aus und sammelt diese, so dass der User diese in Form einer Log Datei abrufen kann.
Wir haben besprochen in welcher Form die Anfragen an das Backend stattfinden sollen, und welche Informationen bzgl. der Jobs festgehalten werden müssen:
- Startzeitpunkt des Jobs
- Nächster Ausführungszeitpunkt
- ggfs. Intervall bis zur nächsten Ausführung
- ID des gewählten Streams
- Typ der auszuführenden Anfrage
- Info Text (Name des Jobs, den der User vergeben kann)

Zusätzlich ist ggfs. festzuhalten wieviele der neu geloggten Anfragen der User bereits betrachtet hat, um die Zahl der neuen Nachrichten rechts-oben am Brief Icon anpassen zu können
Die Ergebnisse der Anfragen sollen bis auf weiteres 1:1 als Text in einer separaten Log Datei für jeden User gespeichert werden. Später kann dann evtl. das Format angepasst werden um die Logs schöner darzustellen.
