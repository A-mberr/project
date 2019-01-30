# Name: Amber Nobel
# Student number: 11819359
from collections import defaultdict
import json
import csv

codes = {
    'Albania': 'AL',
    'Andorra': 'AD',
    'Austria': 'AT',
    'Azerbaijan': 'AZ',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Bosnia and Herzegovina': 'BA',
    'Bulgaria': 'BG',
    'Croatia': 'HR',
    'Cyprus': 'CY',
    'Czechia': 'CZ',
    'Denmark': 'DK',
    'Estonia': 'EE',
    'Finland': 'FI',
    'France': 'FR',
    'Georgia': 'GE',
    'Germany': 'DE',
    'Greece': 'GR',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'Ireland': 'IE',
    'Italy': 'IT',
    'Kazakhstan': 'KZ',
    'Kosovo': 'XK',
    'Latvia': 'LV',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'The former Yugoslav republic of Macedonia': 'MK',
    'Malta': 'MT',
    'Republic of Moldova': 'MD',
    'Monaco': 'MC',
    'Montenegro': 'ME',
    'Netherlands': 'NL',
    'Norway': 'NO',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Romania': 'RO',
    'Russia': 'RU',
    'San Marino': 'SM',
    'Serbia': 'RS',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Spain': 'ES',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Turkey': 'TR',
    'Ukraine': 'UA',
    'United Kingdom of Great Britain and Northern Ireland': 'GB',
    'Vatican City': 'VA'
}

vacc_types = [
    'Hib',
    'Pneu',
    'DTP',
    'Hepb',
]

years = list(map(str, range(1989, 2018)))
field_names = ['Country'] + list(reversed(years))

data = defaultdict(dict)

for vacc_type in vacc_types:

    with open('vacc_eu_{}.csv'.format(vacc_type), newline='') as csvfile:
        # skip the first line (header)
        next(csvfile)

        reader = csv.DictReader(csvfile)

        for row in reader:
            country = row['Country']

            #  skips countries that are not in Europe
            if country not in codes:
                continue

            code = codes[country]

            values = [
                {'year': int(year), 'rate': float(row[year])}
                for year in years
                if row.get(year) not in ['', None]
            ]
            # creates dict like json with land code and vaccin type as keys
            data[code][vacc_type] = values

with open('vacc_line.json', 'w') as jsonfile:
    json.dump(data, jsonfile)
