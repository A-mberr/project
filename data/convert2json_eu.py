# Name: Amber Nobel
# Student number: 11819359

import pandas as pd
import numpy as np

# reads csv and converts it to a dataframe
df_DTP = pd.read_csv('vacc_eu_DTP.csv', header=1)
df_Hepb = pd.read_csv('vacc_eu_Hepb.csv', header=1)
df_Hib = pd.read_csv('vacc_eu_Hib.csv', header=1)
df_Pneu = pd.read_csv('vacc_eu_Pneu.csv', header=1)


array = ['Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium',
            'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Czech Republic',
            'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
            'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein',
            'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Netherlands',
            'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino',
            'Serbia and Montenegro', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
            'Switzerland', 'Ukraine', 'United Kingdom']

append_data = []
years = 2016
while years <= 2017:
    year = str(years)
    name = "df_" + year
    DTP = "df_DTP" + year
    Hepb = "df_Hepb" + year
    Hib = 'df_Hib' + year
    Pneu = 'df_Pneu' + year
    json = name + '.json'

    # print(df_DTP.columns.values)
    print(year)
    print(name)
    # print(DTP)

    # takes the list om countries and the column of the same year
    DTP = df_DTP[['Country', year]]
    # DTP['vaccin'] = "DTP"
    # print(DTP)
    Hepb = df_Hepb[['Country', year]]
    Hib = df_Hib[['Country', year]]
    Pneu = df_Pneu[['Country', year]]

    # selects only the countries from Europe
    DTP = DTP[DTP['Country'].isin(array)]
    Hepb = Hepb[Hepb['Country'].isin(array)]
    Hib = Hib[Hib['Country'].isin(array)]
    Pneu = Pneu[Pneu['Country'].isin(array)]


    # # print(pd.concat(DTP[year], Hepb[year], Hib[year], Pneu[year]))
    name = pd.concat([DTP, Hepb[year], Hib[year], Pneu[year]], axis=1)
    # print(pd.concat([df_DTP, df_Hepb], axis=1))

    name = name[name['Country'].notnull()]
    print(name)
    # rename columns to understand the dataframe
    # df_2017['2017'] = pd.to_numeric(df_2017['2017'], errors='ignore')
    # name.columns = ['Country', 'DKTP_' + year, 'Hepb_' + year, 'Hib_' + year, 'Pneu_' + year]
    # name.columns = ['Country', 'DKTP', 'Hepb', 'Hib', 'Pneu']
    # name.columns = ['Country', year, year, year, year]

    # name = name.set_index('Country').to_dict()
    name = name.set_index('Country')
    # print(name)

    append_data.append(name)
    print(append_data)

    # print(name.to_dict('index'))

    # print(name.columns)
    # start = json.dumps(start)
    # starts = json.loads(start)
    #
    # starts.to_json(json, orient='index')
    years = years + 1
    print(years)

append_data = pd.concat(append_data, axis=1)
# append_data.groupby(['Country'])

# print(append_data.transpose())
# print(append_data.sort_index()
append_data = append_data.transpose()
print(append_data.index)
print(append_data.columns)
# append_data.sort_index()
print(append_data.loc['2016'])
print(append_data)
# append_data.to_json('eu_data.json', orient='index')
