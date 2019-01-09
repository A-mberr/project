# Name: Amber Nobel
# Student number: 11819359

import pandas as pd

# reads csv and converts it to a dataframe
df = pd.read_csv('vacc_nl.csv', delimiter=',')

# df = df[['Cohort', 'DKTP', 'Hib', 'Heb B', 'Pneu', 'BMR', 'Men c']]

print(df)
# creates json to use it for d3 visualisation
# data = df.to_json('data.json', orient='records')
