# Report
Deze website bevat drie verschillende elementen om de vaccinatiegraad weer te geven in Europa. Het doel was om de trend te zien die de vaccinatiegraad doormaakt door de jaren heen en de vaccinatiegraad van Nederland te vergelijken met andere Europese landen

De website moet inzicht geven over de vaccinatiegraad in Europa en Nederland. Vaccinaties zorgen ervoor dat een persoon immuun wordt voor de specifiek infectieziekte waardoor ziekte en zelfs sterfte voorkomen kan worden. De afgelopen jaren is er een teruggang te zien in de vaccinatiegraad in landen zoals Nederland. De vaccinatiegraad is het percentage gevaccineerden mensen in een land. De World Health Organization (WHO) heeft een vaccinatiegraad van 95% vastgesteld om een groepsimmuniteit te kunnen garanderen. Groepsimmunteit is de beschermde immuniteit status van een populatie tegenover een bepaald infectieziekte. Groepsimmunteit zorgt ervoor dat ook de mensen met een minder goed immuunsysteem waaronder kinderen ook kunnen profiteren van de groepsimmuniteit.

Voor de visualisaties zijn er vier databases gebruikt van het WHO om vier verschillende vaccinatietypen en hun vaccinatiegraad weer te geven in Europa. Ook kan er met behulp van de visualisaties zien hoe de vaccinatiegraad in Europa verschilt met dat van Nederland.<br> 
![Project](/doc/project.png)

## File overzicht
De data voor dit project was afkomstig uit vier verschillende CSV-bestanden die zijn samengesteld door de WHO. Om de data op een juiste manier in te laden is er voor elke visualisatie een Python file geschreven om een JSON in het juiste format te genereren. 

*Data*
*	Vacc_eu_DTP.csv
*	Vacc_eu_Hepb.csv
*	Vacc_eu_Hib.csv
*	Vacc_eu_Pneu.csv
*	Concvert2json_bar.py<br>
Vacc_bar_DTP.json<br>
Vacc_bar_Hepb.json<br>
Vacc_bar_Hib.json<br>
Vacc_bar_Pneu.json<br>
*	Concvert2json_line.py<br>
Vacc_line.json<br>
*	Concvert2json_map.py
Vacc_map_DTP.json<br>
Vacc_map_Hepb.json<br>
Vacc_map_Hib.json<br>
Vacc_map_Pneu.json<br>


Voor elke visualisatie is een aparte Javascript file gegenereerd. Dit zorgt ervoor dat de code niet te lang werd en overzichtelijk bleef. Ook is er een common file gecreëerd. Deze file heeft variabelen in zich die in de andere Javascript files worden gebruikt. 

*Scripts*
-	Barchart.js
-	Linechart.js
-	Choropleth.js
-	Common.js


De visualisaties en interactieve elementen zijn te zien in de index.html page. Background.html bevat informatie over vaccins, vaccineren en vaccinatiegraad. About.html geeft persoonlijk informatie weer, de link van de gebruikte databases en een link naar de GitHub page met alle files.

*HTML*
-	Index.html
-	Background.html
-	About.html

De styling is gecreëerd in a de file vacc.css

## Gedetailleerd overzicht
In deze sectie van het wordt elke elk script dat is gebruikt voor de visualisatie uitgebreid besproken in hoe ze tot stand zijn gekomen en hoe ze met elkaar verhouden.

**Choropleth.js**<br> 
De choropleth is een visualisatie die goed de verandering in vaccinatiegraad in heel Europa weergeeft. In een oogopslag is het verschil goed te zien tussen west en oost Europa en de ontwikkeling van de vaccinatiegraad door de jaren heen wanneer men de range slider beweegt.<br> 

![Choropleth](/doc/map.png)

*Data*<br> 
De file laadt vier JSON-files in die de data bevatten over de vaccinatiegraad in Europa en een topoJSON file.

De choropleth is tot stand gekomen met behulp van een topoJSON. De topoJSON bevat de informatie en coördinaten om een kaart van Europa weer te geven. Met behulp van deze topoJSON was het mogelijk om de verschillende landen in te kleuren aan de hand van de vaccinatiegraad.

*Interacties*<br> 
De choropleth reageert op twee interactieve elementen. Ten eerste kan er door het selecteren van een radio button de data van verschillende vaccinatie typen worden getoond in de choropleth. Daarnaast heeft ook de range slider invloed op de weergave van de choropleth. Met behulp van de range slider kan er door de jaren heen worden gekeken hoe de vaccinatiegraad verandert door de verandering van de kleuren in de choropleth.<br> 
![Range slider](/doc/range_slider.png)<br> 
![Radio Buttons](/doc/radio_buttons.png)

Door het klikken op een Europees land op de kaart zal er in de andere twee visualisaties informatie verschijnen over het geselecteerde land.

*Kaart*<br> 
De kaart is geconstrueerd met behulp van een topoJSON. Met behulp van deze JSON was het mogelijk om de verschillende landen in te kleuren aan de hand van de vaccinatiegraad. In dit geval was hoe donkerder de kleur, des te hoger de vaccinatiegraad. Op basis van de output van de range slider wordt de kaart met de bijbehorende vaccinatiegraad ingekleurd.

*Legenda*<br> 
De legenda is een hard coded en verklaart de welke kleuren bij welke percentage hoort.

*Titel*<br> 
De titel is net als het inkleuren van de kaart afhankelijk van de range slider. Met behulp van de range slider kan er door de jaren heen de vaccinatiegraad worden bekeken. Het geselecteerd jaar is te zien in de titel van deze visualisatie.

**Linechart.js**<br> 
De line chart laat goed zijn hoe de vaccinatiegraad in een bepaald land zich heeft ontwikkeld. De visualisatie laat goed zien wanneer vaccinatietypen in een vaccinatieprogramma zijn opgenomen en hoe de vaccinatiegraad schommelt over de jaren.<br> 
![Line chart](/doc/linechart.png)

*Data*<br> 
De line chart laadt een JSON in die de informatie bevat van alle vier de gebruikte CSV-files. De JSON is zo ingericht dat het zowel keys bevat voor het land en voor de verschillende vaccinatie typen.

*Interacties*<br> 
Door het selecteren van een land in de choropleth, verschijnt de land specifieke informatie in de line chart. Met behulp van de checkboxen kan er worden bepaald van welk vaccinatie type de lijn weergegeven wordt.

*Line chart*<br> 
De line chart is opgebouwd uit zowel een x as en een y as die apart in een functie worden gegenereerd. Vervolgens worden de punten in de line chart getekend en worden de punten verbonden met lijnen. De data te zich presenteert is afhankelijk van het geselecteerde land in de choropleth. 

Door met de muis over de punten heen te bewegen verschijnt er een tooltip die de het jaar een specifieke vaccinatiegraad weergeeft. De lijnen die worden weergegeven kunnen worden bepaald door het checken van de gewenste checkboxen.

*Titel*<br> 
De titel verander mee aan de hand van het geselecteerde land. Zo is duidelijk te zien voor welk land de informatie wordt weergegeven.

**Barchart.js**<br> 
De grouped bar chart geeft een goed beeld hoe de vaccinatiegraad van Nederland zich verhoudt met andere landen. Het is goed te zien dat Nederland een relatief hoge vaccinatiegraad heeft maar je ziet ook schommelingen hierin en schetst het goed de grootte van het probleem van de dalende vaccinatiegraad tegenover andere Europese landen.<br> 
![Choropleth](/doc/barchart.png)

*Data*<br> 
Voor deze visualisatie worden er vier verschillende JSONs ingeladen met informatie van elke vaccinatie type.

*Interacties*<br> 
De bar chart visualiseert de data van het land dat is geselecteerd via de choropleth.

*Bar chart*<br> 
De bart chart is opgebouwd uit zowel een x as en een y as die apart in een functie worden gegenereerd. De bars zijn gegroepeerd gebaseerd op jaar. Dit betekend dus dat per jaar twee bars zijn weergegeven, een met de data van Nederland en een van het geselecteerde land. Wanneer je met de muis over een bar beweegt verschijnt er een tootlip met informatie over het jaar een de specifieke vaccinatiegraad.

*Titel*<br> 
De titel is dit geval hard coded

*Legenda*<br> 
De legenda geeft twee kleuren weer. Hierin is een kleur voor de bars van Nederland gereserveerd en de tweede kleur is voor het geselecteerde land. De legenda verandert daarom dus mee afhankelijk van de het land dat op dat moment geselecteerd is.

**Common.js**<br> 
Deze file bevat variabelen die voor elke Javascript file hetzelfde zijn. Zo zijn hier de margins vastgesteld en zijn zowel de x scale en de y scale hier gedefinieerd. Daarnaast is staat hierin in een dictionary die de landcodes die gebruikt worden om de kaart weer te geven worden omgezet in het volledige land namen. 

Deze file wordt ook gebruikt om de interacties van de radio buttons en de range slider te delen met de andere files. Hierdoor kunnen de visualisatie interactief element hebben.

## Uitdagende elementen
Het oorspronkelijke design bevatte een bar chart, een histogram en een choropleth. Alleen de choropleth is als enige element wel gebleven. Het feit dat een bar chart en een histogram veel op elkaar lijken qua visualisatie wilde ik er een vervangen voor een line chart die ook goed een trend kan weergeven over de jaren heen. De bar chart is verandert in een grouped bar chart die hierdoor de vaccincatiegraad van zowel Nederland en een ander Europees land weergeeft.

Daarnaast is het drop down menu verandert naar radio buttons. Ik vond het visueel duidelijker om alle mogelijke keuzes van vaccinatie typen naast elkaar weer te geven dan weggestopt in een drop down menu.

De huidige visualisatie is erg afgeweken van het originele plan en heeft een ontwikkeling doorgemaakt. Oorspronkelijk zou er een bar chart, histogram en een choropleth worden gegenereerd. Alleen de choropleth is als enige element terug in de visualisatie. Het feit dat een bar chart en een histogram veel op elkaar lijken, is ervoor gekozen om het histogram te vervangen voor een line chart die een trend weergeeft over de jaren heen. Daarnaast hebt ik om mijn data beter tot zijn recht te laten komen een grouped bar chart gemaakt. Om de data van Nederland beter te kunnen vergelijken met een ander land is ervoor gekozen om een grouped bar chart hiervoor te gebruiken. 

Ook heb ik de drop down menu verandert naar radio buttons. Het was qua visualisatie duidelijker om alle mogelijke keuzes van vaccinatie typen naast elkaar weer te geven dan weggestopt in een drop down menu.

De uiteindelijke visualisaties zijn meer verklarend dan het oorspronkelijke design. De verschillende visualisaties geven goed de trend in vaccinatiegraad weer in Europa en zijn deze cijfers ook goed te vergelijken met Nederland. De huidige visualisaties verschillen nu meer van elkaar maar zijn onderling toch goed verbonden. Het huidige design visualiseert de data beter dan het oorspronkelijke design.

Als er meer tijd was voor dit project zou ik nog de choropleth niet met margins zijn ingekleurd maar een legenda hebben gekozen waarin de kleuren in elkaar overlopen. Ook zou ik nog een zoom functie creëren zodat de lijnen van de line chart van dicht bij bekeken konden worden.
