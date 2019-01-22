# Name: Amber Nobel
# Student number: 11819359

import pandas as pd
import json
import csv
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

df["Country"] = df['Country'].map(codes).fillna(df['Country'])
print(df["Country"])

print(pd.to_numeric(df.columns, errors='ignore'))
df = df.reset_index(drop=True)
# df = df.replace(np.nan, "NULL")
#
# print(df)
#
data = []
for i in range(39):
    for j in range(20):
        data.append({
          "year": df.columns.values[j],
          "rate": df.iloc[i][j],
          "type": "Hib"
        })

print(data)
# with open(csvFilePath) as f:
#     reader = csv.reader(f)
#     next(reader)
#     # csvReader = csv.DictReader(csvFile)
#     for row in reader:
#         print(row)
#         # country = csv("Country")
#         # data[country] = row
#         # print(row['Country'])
# #         rows.append(row)

# print(bars)

with open("vacc_line.json", "w") as jsonfile:
    (json.dump(data, jsonfile))
