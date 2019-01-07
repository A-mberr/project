Project van Amber Nobel
============
Application goals:
Met deze website hoe de vaccinatiegraad door de jaren heen is toegenomen. Er van uitgaande dat de WHO streeft naar een vaccinatiegraad van 95%, is er nog veel winst in te halen. Met deze visualisaties kan je de ontwikkeling van de vaccinatiegraad bekijken van verschillende landen van verschillende vaccinatie typen door de jaren heen. 


Vaccineren lijkt de laatste tijd weer een veel besproken onderwerp in Nederland. Mensen trekken in twijfel of de vaccinaties wel doen wat ze moeten doen of dat ze zelfs bepaalde ziektes kunnen veroorzaken. Dit heeft geleid tot een afname in vaccinatiegraad in Nederland, met als gevolg dat de groepsimmuniteit daalt. Dit heeft als gevolg dat mensen elkaar weer makkelijker kunnen besmetten en er steeds meer gevallen van de mazelen in Nederland worden gedetecteerd.

Voor deze opdracht zal de vaccinatiegraad van Nederland in kaart worden gebracht aan de hand van een [database](https://www.volksgezondheidenzorg.info/onderwerp/vaccinaties/cijfers-context/trends#node-trend-vaccinatiegraad-zuigelingen) van het RIVM (Rijksinstituut voor Volksgezondheid en Milieu). Er zal worden gekeken hoe deze vaccinatiegraad is veranderd over de jaren. Ook zal er een kaart van Nederland weergeven hoe de vaccinatiegraad verschilt in verschillende regio’s in Nederland. Vervolgens zal er aan de hand van een [database](http://apps.who.int/gho/data/node.main.A824?lang=en) van het WHO (World Health organisation) geraadlpeegd om de vaccinatiegraad te bekijken binnen Europa. 

Voor de visualisatie van de vaccinatiegraad van Nederland zal er een histogram worden gecreëerd. Je kan met behulp van drop down aanklikken welke histogram je wil tonen afhankelijk van de geselecteerde vaccinatie type. Afhankelijk wordt dit grouped bars of wordt het histogram naast de andere getekend.

Vervolgens komt hierbij een kaart van Europa dat een chloropleth wordt. Aan de hand van de eerdergenoemde drop down menu zal er een chloropleth worden gemaakt aan de hand van de vaccinatiegraad van de selecteerde vaccinatie type. De vaccinatiegraad verschilt per jaar en daarom wordt hieronder een tijdlijn geplaatst waarop je bolletje kan bewegen tussen de verschillende jaren om de vaccinatiegraad door de jaren heen te bekijken in Europa. Wanneer je met de muis over een land op de kaart gaat komt er in het wolkje informatie te staan over de vaccinatiegraad, het jaar en het land. 

Wanneer je op het land klikt veranderen die bar chart die eronder is weergegeven. De bars van de bar chart staan voor de verschillende vaccinatie types. De hoogte van de bars bepaald de vaccinatiegraad van het geselecteerde land in procenten weer. Ook de bar chart zal veranderen wanneer er een ander jaar wordt geselecteerd via de tijdlijn en zal hierbij de bijbehorende bars tekenen. Met behulp van check boxen kan je aanvinken welke bars je te zien wil krijgen in de bar chart. De tiptool functie zal meer informatie geven wanneer de muis over een bar gaat.

Voor het creëren van dit project heb zal ik gebruik maken van Javascript, HTML, CSS en als extra library D3.

Het lastigste dat ik tegen zal komen is het creëren van chloropleths die ook nog eens informatie kunnen weergeven met behulp van de huidige informatie over d3 op het internet.
