Project van Amber Nobel
============
**Application goals:**<br>
Met deze website kan je zien hoe de vaccinatiegraad door de jaren heen is toegenomen. Ervan uitgaande dat de WHO streeft naar een vaccinatiegraad van 95%, is er nog veel winst in te halen. Met deze visualisaties kan je de ontwikkeling van de vaccinatiegraad bekijken van verschillende landen van verschillende vaccinatie typen door de jaren heen.

**Doel**<br>
Vaccineren lijkt de laatste tijd weer een veel besproken onderwerp in Nederland. Mensen trekken in twijfel of de vaccinaties wel doen wat ze moeten doen of dat ze zelfs bepaalde ziektes kunnen veroorzaken. Dit heeft geleid tot een afname in vaccinatiegraad in Nederland, met als gevolg dat de groepsimmuniteit daalt. De WHO streeft ernaar om een vaccinatiegraad van 95% te bereiken om enigszins groepsimmuniteit te kunnen garanderen. Wanneer deze vaccinatiegraad lager is dan 95% kan dit als gevolg hebben dat mensen elkaar makkelijker kunnen besmetten en er steeds meer gevallen van bijvoorbeeld de mazelen in Nederland worden gerapporteerd.

De visualisatie zal een beeld schetsen van de vaccinatiegraad van 4 verschillende vaccinatie typen in Europe. De data die is gebruikt voor deze visualisatie is afkomstig van de [database](http://apps.who.int/gho/data/node.main.A824?lang=en) van het WHO (World Health organisation).

Aan de hand van deze data kunnen we een beeld schetsen van de vaccinatiegraad van Nederland tegenover die van andere landen in Europa. De ontwikkeling van het invoeren van vaccinaties zullen ook zichtbaar worden door de stijging van de vaccinatiegraad. De visualisatie zal ook een beeld schetsen van de weg die we hebben af te leggen om de gewenste vaccinatiegraad van 95% te bereiken.

**Visualisatie**<br>
The choropleth geeft de kaart van Europa weer met hierin de vaccinatiegraad weergegeven aan de hand van een legende. De vaccinatiegraad van de geselecteerde radio button wordt weergegeven. Met behulp van de range slider kan er een trend worden gezien over de jaren heen. Hoe donkerder de landen ingekleurd zijn, hoe hoger de vaccinatiegraad. Wanneer je met de muis over een land op de kaart gaat komt er in het wolkje informatie te staan over de vaccinatiegraad, het jaar en het land. Je kan in de choropleth een land aanklikken waardoor zowel de grouped bar chart en de line graph hierop zullen aanpassen.
![Choropleth](/doc/map.png)
![Radio buttons](/doc/radio_buttons.png)
![Range Slider](/doc/range_slider.png)

Voor de visualisatie om de vaccinatiegraad van Nederland te vergelijken met een ander land wordt er een grouped bar chart gecreëerd. Deze bar chart geeft de vaccinatiegraad weer over de tijd vergeleken met een ander Europees land dat is geselecteerd via de choropleth. Je kan de data aanpassen door een ander land te selecteren en door met behulp van radio buttons een vaccinatiegraad te selecteren.
![Grouped bar chart](/doc/grouped_barchart.png)

De line chart zal de vaccinatiegraad over de jaren heen weergeven van het geselecteerde land van de choropleth. In de visualisatie zullen checkboxen weergegeven zijn. Hierdoor kan je aanklikken voor welke vaccinatietypen weergegeven wil hebben. Hierdoor kan je goed de verschillende trends vergelijken van verschillende vaccinatietypen.
![Line chart](/doc/linechart.png)
<br><br>
De video die te zien is via onderstaande link zal een korte rondleiding geven over de website en de visualisaties die voor dit project zijn gecreeerd:<br>
https://youtu.be/zD9nafG6Hzs


**Benodigde talen en libraries**<br>
Voor het creëren van dit project heb zal ik gebruik maken van Javascript, HTML, Python, CSS en als extra library D3 en de functie om topojson te kunnen gebruiken

**Uitdagende elementen**<br>
Het lastigste dat ik tegen zal komen is het creëren van choropleths die ook nog eens informatie kunnen weergeven met behulp van de huidige informatie over d3 op het internet. Ook zullen de vele interactieve elementen een uitdaging zijn om de juiste data weer te geven. Ik heb bijvoorbeeld nog niet eerder met een tijdlijn functie gewerkt en het interactieve aspect ervan.

**Gebruik van de website**<br>
Voor de beste weergave van de website is deze het best te openen via een FireFox browser.
<br><br>
De volgende bronnen zijn gebruikt voor dit project, waarvan ook de licences zijn gechekt voor het gebruik. Alle genoemde bronnen vallen niet onder deze licentie:
<br><br>
barchart.js:<br>
https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915
<br><br>
choropleth.js:<br>
https://www.youtube.com/watch?v=Qw6uAg3EO64
<br><br>
index.html<br>
https://www.w3schools.com/css/css_navbar.asp
<br><br>
De tooltip dunctie is gebruikt in zowel linechart.js en barchart.js. Hiervoor is de code gebruikt van volgende website:<br>
https://gist.github.com/woodyrew/645d0258415db9205da52cb0e049ca28
<br><br>
Kleuren schema's zijn gehaald van:<br>
http://colorbrewer2.org/
<br><br>
Databases die zijn gebruikt voor dit project zijn afkomstig van:<br>
http://apps.who.int/gho/data/node.main.A824?lang=en
<br><br>
De range slider in index.html en de layout ervan in vacc.css zijn tot stand gekomen door de code van:<br>
https://www.w3schools.com/howto/howto_js_rangeslider.asp
<br><br>
De navigatie bar is tot stand gekomen door gebruik van de vogende website:<br>
https://www.w3schools.com/css/css_navbar.asp
<br><br>
De background infomation in background.html is samengesteld aan de hand van de volgende websites:<br>
https://rijksvaccinatieprogramma.nl/infectieziekten/groepsimmuniteit<br>
https://www.cm.be/ziekte-en-behandeling/vaccinaties/algemeen/belang<br>
https://nl.wikipedia.org/wiki/Vaccin

**Licentie**<br>
MIT License

Copyright (c) 2019 A-mberr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
