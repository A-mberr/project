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

years = 2015
while years <= 2017:
    year = str(years)
    name = "df_" + year
    DTP = "df_DTP_" + year
    Hepb = "df_Hepb" + year
    Hib = 'df_Hib' + year
    Pneu = 'df_Pneu' + year
    json = name + '.json'

    print(df_DTP.columns.values)
    print(year)
    print(name)

    # takes the list om countries and the column of the same year
    DTP = df_DTP[['Country', year]]
    Hepb = df_Hepb[['Country', year]]
    Hib = df_Hib[['Country', year]]
    Pneu = df_Pneu[['Country', year]]

    # selects only the countries from Europe
    DTP = df_DTP[df_DTP['Country'].isin(array)]
    Hepb = df_Hepb[df_Hepb['Country'].isin(array)]
    Hib = df_Hib[df_Hib['Country'].isin(array)]
    Pneu = df_Pneu[df_Pneu['Country'].isin(array)]

    # contatenate the different dataframes
    print(DTP)
    # print(pd.concat(DTP[year], Hepb[year], Hib[year], Pneu[year]))
    name = pd.concat([DTP, Hepb[year], Hib[year], Pneu[year]], axis=1)
    name = name[name['Country'].notnull()]

    # rename columns to understand the dataframe
    # df_2017['2017'] = pd.to_numeric(df_2017['2017'], errors='ignore')
    # name.columns = ['Country', 'DKTP', 'Hepb', 'Hib', 'Pneu']

    # print(name)
    # name.set_index(['Country']).to_json(json, orient='index')
    years = years + 1
    print(years)
    # break



# print(name)

# df_1989.set_index(['Country']).to_json('vacc_1989.json', orient='index')
# df_1990.set_index(['Country']).to_json('vacc_1990.json', orient='index')
# df_1991.set_index(['Country']).to_json('vacc_1991.json', orient='index')
# df_1992.set_index(['Country']).to_json('vacc_1992.json', orient='index')
# df_1993.set_index(['Country']).to_json('vacc_1993.json', orient='index')
# df_1994.set_index(['Country']).to_json('vacc_1994.json', orient='index')
# df_1995.set_index(['Country']).to_json('vacc_1995.json', orient='index')
# df_1996.set_index(['Country']).to_json('vacc_1996.json', orient='index')
# df_1997.set_index(['Country']).to_json('vacc_1997.json', orient='index')
# df_1998.set_index(['Country']).to_json('vacc_1998.json', orient='index')
# df_1999.set_index(['Country']).to_json('vacc_1999.json', orient='index')
# df_2000.set_index(['Country']).to_json('vacc_2000.json', orient='index')
# df_2001.set_index(['Country']).to_json('vacc_2001.json', orient='index')
# df_2002.set_index(['Country']).to_json('vacc_2002.json', orient='index')
# df_2003.set_index(['Country']).to_json('vacc_2003.json', orient='index')
# df_2004.set_index(['Country']).to_json('vacc_2004.json', orient='index')
# df_2005.set_index(['Country']).to_json('vacc_2005.json', orient='index')
# df_2006.set_index(['Country']).to_json('vacc_2006.json', orient='index')
# df_2007.set_index(['Country']).to_json('vacc_2007.json', orient='index')
# df_2008.set_index(['Country']).to_json('vacc_2008.json', orient='index')
# df_2009.set_index(['Country']).to_json('vacc_2009.json', orient='index')
# df_2010.set_index(['Country']).to_json('vacc_2010.json', orient='index')
# df_2011.set_index(['Country']).to_json('vacc_2011.json', orient='index')
# df_2012.set_index(['Country']).to_json('vacc_2012.json', orient='index')
# df_2013.set_index(['Country']).to_json('vacc_2013.json', orient='index')
# df_2014.set_index(['Country']).to_json('vacc_2014.json', orient='index')
# df_2015.set_index(['Country']).to_json('vacc_2015.json', orient='index')
# df_2016.set_index(['Country']).to_json('vacc_2016.json', orient='index')
# df_2017.set_index(['Country']).to_json('vacc_2017.json', orient='index')
