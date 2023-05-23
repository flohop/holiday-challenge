# ☀️check24-holiday-challenge☀️

<h3 align="center">
  <a href="http://141.95.127.73/?departureAirports=MUC&countChildren=0&countAdults=2&duration=3&earliestDepartureDate=2023-05-16&latestReturnDate=2023-05-30&mealType=NONE&roomType=DOUBLE&maxPrice=900">✨ LIVE WEBSITE ✨</a> 
  
</h2>

<p>
    <details>
      <summary><a href="https://www.ovhcloud.com/de/vps/">Server Specs</a></summary>
     
    - Tier: Value
    - 1 vCore
    - 2GB RAM
    - 40 GB SSD NVMe
    - bis zu 250 Mbit/s   

</details>
  
  </p>

## Intro 

Vielen Dank, dass sie mein Projekt für das **Check24 CodeDev Scholarship** in Betracht ziehen.

Es war hat viel Spaß gemacht, an diesem Projekt zu arbeiten und dabei eine Menge zu lernen. 
Da ich zum ersten mal mit so einem großen Datensatz arbeitete, konnte ich meine Kenntnisse in diesen Bereich imens erweitert.

Das Projekt zielt darauf ab, die Wartezeit für Benutzer zu minimieren und ihnen ein reibungsloses Nutzungserlebnis zu bieten. 
In dieser README-Datei werden nicht nur die Schritte zum Ausführen des Projekts erklärt, sondern auch alle Optimierungen, die implementiert wurden, um die Leistung zu verbessern.
Im Abschluss werden noch mögliche Verbesserungen betrachtet, die implementiert werden sollten, wenn man das Projekt veröffentlichen wollen würde.

### Lokal ausführen

<p align="center">
  
  <img src="https://logos-world.net/wp-content/uploads/2021/02/Docker-Logo-2015-2017.png" alt="Docker" width="562.5" height="421.875">
 </p>

Dank der mitgelieferten `docker-compose.yaml` Datei ist die lokale ausführung sehr reibungslos.
1. `docker compose build`
2. `docker compose up`

Danach sollten folgende Docker container gestartet werden:
- mongodb server auf port **27017**
- ExpressJs backend auf port **4000**
- ReactJs frontend auf port **3000**

Um die mitgelieferten `.csv` Dateien in die MongoDb Datei zu laden, sind drei weitere Befehle notwendig:

Um die Offers in die Datenbank laden zu können, muss zuvor das ';' als Trennzeichen mit ',' ersetzt werden
``

Offers laden: 

`mongoimport --db test --collection offers --type csv --headerline --file /path/to/your/csv/offers.csv --delimiter ";"`

Hotels laden:

``mongoimport --db test --collection hotels --type csv --headerline --file /path/to/your/csv/hotels.csv --delimiter ";"``


Da jedoch der Import der Daten sehr lange dauert, ist auch eine [Live Website](http://141.95.127.73/) bereit gestellt, wo die Anwendung genutzt werden kann.
Jedoch sind hier die Ladegeschwindigkeiten langsamer als bei der lokalen Ausführung, da der gemietete Server geringere Specs hat als die meisten Arbeitslaptops.


Um einen besseren Überblick über die Laufzeit zu erhalten, können sie das mit abgegebene Video betrachten, wo das Projekt vorgestellt wird.


## Backend
<p align="center">
<img src="https://vectorified.com/images/express-js-icon-20.png" alt="ExpressJs" width="250" height="250">
<img src="https://cdn.icon-icons.com/icons2/3053/PNG/512/graphql_playground_macos_bigsur_icon_190105.png" alt="GraphQL" width="250" height="250">
<img src="https://pluspng.com/img-png/logo-mongodb-png-mongodb-1600.png" alt="MongoDB" width="250" height="250">

</p>


Für das Backend wurde ExpressJs mit Typescript verwendet. <br/>
Ich habe mich für ExpressJs entschieden, aufgrund des geringen performance overheads. 

Kombiniert wurde das mit GraphQL um die API möglichst typesafe zu machen. Außerdem kann dadurch der Client entscheiden welche Attribute er vom Server benötigt. 
Dies wurde für diese Anwendung zwar nicht sehr häufig verwendet, jedoch kann dies bei einer möglichen Weiterentwicklung der Seite nützlich sein.

Es wurde sich für MongoDb anstatt einer SQL Datenbank entschieden, da es in diesem Projekt nur 2 Objektetypen gibt und eine relationale Datenbank dadurch zu viel overhead hätte und damit eine potentiell geringere Lesezeit

### Endpoints:

Alle angebotenen Queries können unter [`/graphql`](http://141.95.127.73:4000/graphql) betrachtet werden. Dies zwei wichtigsten für diese Anwendung sind:
 - offers_by_filter: Erhlate von jedem Hotel das billigste Angebot abhängig von einer vollständigen Nutzereingabe
 - offers_by_hotel_by_filter: Erhalte von einem Hotel alle Angebote die für den Nutzer infrage kommen

### Optimierungen:
Der Server wurde entwickelt mit Fokus auf Geschwindigkeit. Dafür wurden mehrere an Technicken verwendet, die wichtigsten werden hier gelistet zusammen mit dem Drawback der dadurch kommt.

<details>
  <summary><a href="https://www.mongodb.com/docs/manual/core/query-optimization/#covered-query">Covered Query</a></summary>
    
     
    🟢 Signifikant schnellere Lesegeschwindigkeit
    
    🔴 Größere Datenbankgröße
    🔴 Langsamere Schreibleistung (für dieses Projekt nicht relevant, da keine neuen Angebote erstellt werden)
    🔴 Längeres Setup. Das Erstellen der Indizes dauert eine beträchtliche Zeit.
  
    Bei allen Queries wurde darauf geachtet, dass für diese ein Index existiert. Dadurch kann dieser geprüft werden 
    und die 100 Millionen Dokumente müssen nicht durchsucht werdne. Dies hat eine Signifikante Verbesserung der Lesegeschwindigkeit zur Folge
  
</details>

<details>
  <summary>Optimisierte Queries</summary>
     
    🟢 Schnellere Lesegeschwindigkeit
  
    Die einzelnen Schritte der aggregate Funktion sind so angeordnet, um die Lesezeit zu minimieren.
    So wird erst nach initialem Filtern die Länge des Urlaubs berechnet (duration), um das an möglichst wenig Dokumenten machen zu müssen.
  
</details>


<details>
  <summary>Hotels In-Memory speichern</summary>
  
    🟢 Konstante Zugriffszeit
  
    🔴 Nicht Skalierbar für Millionen von Hotels
  
    Die Hotels werden nicht aus der MongoDb Datenbank ausgelesen, sondern aus einer Liste.
    Die Liste wird zu Beginn des Servers initialisiert indem die Hotels aus einer JSON Datei geladen werden.
    Dadurch muss dafür nie auf die MongoDb Datenbank zugegriffen werden, was zu einer sehr schnellen Lesezeit für die Hotels führt
 </details>
 
 
<details>
  <summary>Pagination</summary>
  
  🟢 Weniger Dokumente auslesen
  
  🟢 Weniger Dokumente werden übertragen
  
  Um nicht alle gefundenen Hotels auf einmal auszulesen und dem Nutzer zu senden,
  wird Pagination verwendet. Dadurch kann im Frontend ein Infinite-Scroll implementiert werden.
  
 </details>
 
 
## Frontend

<p align="center">
  <img src="https://i0.wp.com/programmingwithmosh.com/wp-content/uploads/2019/01/2000px-React-icon.svg_.png?fit=500%2C1413&ssl=1" alt="React" width="250" height="250">
  <img src="https://www.rlogical.com/wp-content/uploads/2021/08/Rlogical-Blog-Images-thumbnail.png" alt="NextJs" width="250" height="250">
  <img src="https://cdn.icon-icons.com/icons2/3053/PNG/512/graphql_playground_macos_bigsur_icon_190105.png" alt="GraphQL" width="250" height="250">  
 </p>

Für das Frontend wurde das zur Verfügung gestellte Projekt mit NextJs (React) und Typescript verwendet und erweitert.

<details>
  <summary>Infinite Scroll</summary>
  
  🟢 Geringere Wartezeiten
  
  Dank der Pagination im Backend, kann nur ein Subset von alle Angeboten & Hotels geladen werden.
  Sobald der Nutzer bestimmt weiter runtergescrollt ist, werden weitere Angebote bzw. Hotels geladen.
  Indem die Anzahl der geladenen Objekte / des loading thresholds optimiert wird, kann man die Illusion wahren,
  dass alle Objekte in so kurzer Zeit geladen wurden.
  
</details>

<details>
  <summary>Zusätzliche Filter</summary>
  
  🟢 Genauerer Filter sorgt für weniger Angebote und schnellere Lesezeit
  
  🔴 Nutzer muss mehr Eingabefelder ausfüllen
  
  Indem zusätzliche zu den vorausgesetzen Filter nach `roomtype`, `mealtype`, `price` & `oceanview` gefiltered wird,
  kann eine schnellere Datenbankanfrage erzielt werden.
  
 </details>
  

## zukünftige Verbesserungen

In diesem Projekt wurden einige best practices vernachlässigt, die für eine production Anwendung noch nötig wären.
Diese sollen in dieser Sektion aufgelistet werden und kurz erwähnt werden, warum sie nötig sind.

<details>
  <summary>SSL Encryption</summary>
  
  Momentan ist die Kommunikation mit der Website nicht verschlüsselt und läuft über http.
  Diese Verbindung müsste noch mit einem Service with *Let's Encrypt* zu https gebracht werden.
  
 </details>
 
 <details>
  <summary>CI/CD Pipeline</summary>
  
  Momentan muss bei Veränderung des Codes, dieser manuell gebuilded werden, auf dem Server gecloned und docker compose neu 
  ausgeführt werden. Dies sollte automatisiert werden und der build code nicht mehr auf GitHub hochgeladen werden.
  Außerdem sollte in Zuge dessen das Projekt eine Test pipeline durchlaufe.
 </details>
 
 <details>
  <summary>Tests</summary>
  
  Momentan wurden keine Tests geschrieben um die Funktionalitäten des Projekts zu prüfen.
  Dies wäre noch unabdinglich, wenn man das Projekt weiter entwickeln und skalieren wollte.
  
 </details>
 
 
 <details>
  <summary>Mehr Type safety</summary>
  
  Obwohl Typescript verwendet wurde, wurde oft der `any` type verwendet, um die Entwicklung zu beschleunigen.
  Da dies jedoch auf Lange sich die Entwicklung potentiell verlangsamt, wäre es noch wichtig, Typescript im vollen Umfang 
  im Projekt zu verwenden.
  
 </details>


## Outro

Ich hoffe ich konnte mit diesem Projekt aussagekräftig demonstrieren, warum ich für das Stipendium geeignet bin.
Sollten sie noch irgendwelche Fragen zum Projekt haben, lassen sie es mich gerne wissen: `hoppe.florian02@gmail.com`



