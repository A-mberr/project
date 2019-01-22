# Name: Amber Nobel
# Student number: 11819359

import pandas as pd
import csv
import json
import numpy as np

# # reads csv and converts it to a dataframe
# df = pd.read_csv('vacc_nl.csv', encoding='cp1252')
#
# df['DKTP'] = df['DKTP'].str.replace(',', '.')
# df['DKTP'] = df['DKTP'].str.strip('b')
# df['DKTP'] = pd.to_numeric(df['DKTP'])
#
# df = df[['Cohort', 'DKTP', "Pneu"]]
#
# df.to_json('data_nl.json', orient='records')


array = ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium',
            'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Czechia',
            'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
            'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein',
            'Lithuania', 'Luxembourg', 'The former Yugoslav republic of Macedonia',
            'Malta', 'Republic of Moldova', 'Monaco', 'Netherlands', 'Norway',
            'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino',
            'Serbia and Montenegro', 'Serbia', 'Slovakia', 'Slovenia', 'Spain',
            'Sweden', 'Switzerland', 'Ukraine',
            'United Kingdom of Great Britain and Northern Ireland']

codes = {"Albania": "AL",
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
"Vatican City": "VA"}

csvFilePath = "vacc_eu_Hib.csv"

df = pd.read_csv(csvFilePath, header=1)

df = df[df['Country'].isin(array)]
df = df[df['Country'].notnull()]

print(df["Country"])
df["Country"] = df['Country'].map(codes).fillna(df['Country'])
print(df["Country"])
# df.insert(loc=0, column='new_column', value=column_values)
print(df.columns)

df = df.reset_index(drop=True)
NL = df.iloc[[23]]
print(pd.to_numeric(df.columns, errors='ignore'))
df = df.replace(np.nan, "NULL")


# small = df[['Country', '2017']]

data = []
for column in df:
    rates = pd.Series(df[column].values, index=df["Country"]).to_dict()
    data.append(rates)
    # print(df[column])

with open("jsonfilepath.json", "w") as jsonfile:
    (json.dump(data, jsonfile))
