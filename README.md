Project van Amber Nobel
============
**Application goals:**<br>
Met deze website hoe de vaccinatiegraad door de jaren heen is toegenomen. Er van uitgaande dat de WHO streeft naar een vaccinatiegraad van 95%, is er nog veel winst in te halen. Met deze visualisaties kan je de ontwikkeling van de vaccinatiegraad bekijken van verschillende landen van verschillende vaccinatie typen door de jaren heen. 

**Doel**<br>
Vaccineren lijkt de laatste tijd weer een veel besproken onderwerp in Nederland. Mensen trekken in twijfel of de vaccinaties wel doen wat ze moeten doen of dat ze zelfs bepaalde ziektes kunnen veroorzaken. Dit heeft geleid tot een afname in vaccinatiegraad in Nederland, met als gevolg dat de groepsimmuniteit daalt. De WHO streeft ernaar om een een vaccinatiegraad van 95% te bereiken om enigzins groepsimmuniteit te kunnen garanderen. Wanneer deze vaccinatiegraad lager is dan 95% kan dit als gevolg hebben dat mensen elkaar makkelijker kunnen besmetten en er steeds meer gevallen van bijvoorbeeld de mazelen in Nederland worden gerapporteerd.

Voor deze opdracht zal de vaccinatiegraad van Nederland in kaart worden gebracht aan de hand van een [database](https://www.volksgezondheidenzorg.info/onderwerp/vaccinaties/cijfers-context/trends#node-trend-vaccinatiegraad-zuigelingen) van het RIVM (Rijksinstituut voor Volksgezondheid en Milieu). Er zal worden gekeken hoe deze vaccinatiegraad is veranderd over de jaren. Vervolgens zal er aan de hand van een [database](http://apps.who.int/gho/data/node.main.A824?lang=en) van het WHO (World Health organisation) geraadlpeegd om de vaccinatiegraad te bekijken binnen Europa.

Aan de hand van deze data kunnen we een beeld schetsen van de vaccinatiegraad van Nederland tegenover die van andere landen in Europa. De ontwikkeling van het invoeren van vaccinaties zullen ook zichtbaar worden door de stijging van de vaccinatiegraad. De visualisatie zal ook een beeld schetsen van de weg die we hebben af te leggen om de gewenste vaccinatiegraad van 95% te bereiken.

**Visualisatie**<br>
Voor de visualisatie van de vaccinatiegraad van Nederland zal er een histogram worden gecreëerd. Je kan met behulp van drop down aanklikken welke histogram je wil tonen afhankelijk van de geselecteerde vaccinatie type. Afhankelijk wordt dit grouped bars of wordt het histogram naast de andere getekend.

Vervolgens komt hierbij een kaart van Europa dat een chloropleth wordt. Aan de hand van de eerdergenoemde drop down menu zal er een chloropleth worden gemaakt aan de hand van de vaccinatiegraad van de selecteerde vaccinatie type. De vaccinatiegraad verschilt per jaar en daarom wordt hieronder een tijdlijn geplaatst waarop je bolletje kan bewegen tussen de verschillende jaren om de vaccinatiegraad door de jaren heen te bekijken in Europa. Wanneer je met de muis over een land op de kaart gaat komt er in het wolkje informatie te staan over de vaccinatiegraad, het jaar en het land. 

Wanneer je op het land klikt veranderen die bar chart die eronder is weergegeven. De bars van de bar chart staan voor de verschillende vaccinatie types. De hoogte van de bars bepaald de vaccinatiegraad van het geselecteerde land in procenten weer. Ook de bar chart zal veranderen wanneer er een ander jaar wordt geselecteerd via de tijdlijn en zal hierbij de bijbehorende bars tekenen. Met behulp van check boxen kan je aanvinken welke bars je te zien wil krijgen in de bar chart. De tiptool functie zal meer informatie geven wanneer de muis over een bar gaat.

**Benodigde talen en libraries**<br>
Voor het creëren van dit project heb zal ik gebruik maken van Javascript, HTML, CSS en als extra library D3. Mogelijk worden nog gedurende het proces extra libraries toegevoegd.

**Uitdagende elementen**<br>
Het lastigste dat ik tegen zal komen is het creëren van chloropleths die ook nog eens informatie kunnen weergeven met behulp van de huidige informatie over d3 op het internet. Ook zullen de vele interactieve elementen een uitdaging zijn om de juiste data weer te geven. Ik heb bijvoorbeeld nog niet eerder met een tijdlijn functie gewerkt en het interactieve aspect ervan.
