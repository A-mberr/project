# Name: Amber Nobel
# Student number: 11819359

import pandas as pd
import csv
import json

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
            'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Czech Republic',
            'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
            'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein',
            'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Netherlands',
            'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino',
            'Serbia and Montenegro', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
            'Switzerland', 'Ukraine', 'United Kingdom']

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
"Czech Republic": "CZ",
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
"Macedonia": "MK",
"Malta": "MT",
"Moldova": "MD",
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
"United Kingdom": "GB",
"Vatican City": "VA"}



csvFilePath = "vacc_eu_Hib.csv"

df = pd.read_csv(csvFilePath, header=1)


# df['new_column'] = 'hello'
# column_values = pd.Series(codeList)
df = df[df['Country'].isin(array)]
df = df[df['Country'].notnull()]


df["Country"] = df['Country'].map(codes).fillna(df['Country'])
# df.insert(loc=0, column='new_column', value=column_values)
# print(df)
# print(df.columns)
# df = df.apply(pd.to_numeric, errors='ignore').info()
print(df.columns)

df = df.reset_index(drop=True)
print(df)
# df = df.set_index(["Country"])
NL = df.iloc[[23]]
print(NL)
print(pd.to_numeric(df.columns, errors='ignore'))

small = df[['Country', '2017']]
# for i in range(20):
#     print(pd.Series(df["1997"].values, index=df["Country"]).to_dict())
# print(df.loc[df.columns[1], "Albania"])

data = {}
# rows = []

for column in df:
    print(pd.Series(df[column].values, index=df["Country"]).to_dict())
    # print(df[column])


# print(pd.Series(df["1997"].values, index=df["Country"]).to_dict())

# print(df.index)
# print(df)

# transpose
#
# data = {}
# rows = []
# with open(csvFilePath) as f:
#     reader = csv.reader(f)
#     next(reader)
#     # csvReader = csv.DictReader(csvFile)
#     for row in reader:
#         # print(row)
#         # country = csv("Country")
#         # data[country] = row
#         # print(row['Country'])
#         rows.append(row)
#
# with open("jsonfilepath.json", "w") as jsonfile:
#     (json.dump(rows, jsonfile))

# with open('data.json', 'w') as outfile:
#     json.dump(row, outfile)
