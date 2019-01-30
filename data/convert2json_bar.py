# Name: Amber Nobel
# Student number: 11819359

import pandas as pd

countries_in_eu = [
    'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium',
    'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Czechia',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
    'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein',
    'Lithuania', 'Luxembourg', 'The former Yugoslav republic of Macedonia',
    'Malta', 'Republic of Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway',
    'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino',
    'Serbia and Montenegro', 'Serbia', 'Slovakia', 'Slovenia', 'Spain',
    'Sweden', 'Switzerland', 'Ukraine',
    'United Kingdom of Great Britain and Northern Ireland'
]

codes = {
    "Albania": "AL",
    "Andorra": "AD",
    "Austria": "AT",
    "Azerbaijan": "AZ",
    "Belarus": "BY",
    "Belgium": "BE",
    "Bosnia and Herzegovina": "BA",
    "Bulgaria": "BG",
    "Croatia": "HR",
    "Cyprus": "CY",
    "Czechia": "CZ",
    "Denmark": "DK",
    "Estonia": "EE",
    "Finland": "FI",
    "France": "FR",
    "Georgia": "GE",
    "Germany": "DE",
    "Greece": "GR",
    "Hungary": "HU",
    "Iceland": "IS",
    "Ireland": "IE",
    "Italy": "IT",
    "Kazakhstan": "KZ",
    "Kosovo": "XK",
    "Latvia": "LV",
    "Liechtenstein": "LI",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "The former Yugoslav republic of Macedonia": "MK",
    "Malta": "MT",
    "Republic of Moldova": "MD",
    "Monaco": "MC",
    "Montenegro": "ME",
    "Netherlands": "NL",
    "Norway": "NO",
    "Poland": "PL",
    "Portugal": "PT",
    "Romania": "RO",
    "Russia": "RU",
    "San Marino": "SM",
    "Serbia": "RS",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "Spain": "ES",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Turkey": "TR",
    "Ukraine": "UA",
    "United Kingdom of Great Britain and Northern Ireland": "GB",
    "Vatican City": "VA"
}

vacc_types = [
    "Hib",
    "Pneu",
    "DTP",
    "Hepb",
]

for vacc_type in vacc_types:
    csvFilePath = "vacc_eu_{}.csv".format(vacc_type)

    df = pd.read_csv(csvFilePath, header=1)

    # selects only countries from Europe
    df = df[df['Country'].isin(countries_in_eu)]

    # changes country name to country code
    df["Country"] = df['Country'].map(codes).fillna(df['Country'])

    df = df.set_index('Country')

    df = df.apply(pd.to_numeric, errors='ignore')

    df.to_json('vacc_bar_{}.json'.format(vacc_type), orient='index')
