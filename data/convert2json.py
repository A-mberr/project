# Name: Amber Nobel
# Student number: 11819359

import pandas as pd

# reads csv and converts it to a dataframe
df = pd.read_csv('vacc_nl.csv', encoding='cp1252')

df['DKTP'] = df['DKTP'].str.replace(',', '.')
df['DKTP'] = df['DKTP'].str.strip('b')
df['DKTP'] = pd.to_numeric(df['DKTP'])

df = df[['Cohort', 'DKTP']]

df.to_json('data_nl.json', orient='records')
