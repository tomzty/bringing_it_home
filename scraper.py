from os import path

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import json
import csv
from datetime import date
import pandas as pd
import numpy as np
import niche_scrape as niche
import mls_scrape as mls
import walkscore as walkscore

web_driver = webdriver.Chrome('/usr/local/bin/chromedriver')

df = mls.get_listings(web_driver)
parsed = json.loads(df.to_json(orient="index"))
neighborhood = niche.get_niche_grade(web_driver,1)
walkscore, transitscore, bikescore = walkscore.get_scores(df.iloc[0,0])

result_list = []
for i in parsed:
    result = {}
    result['bid_id'] = i
    result['no_bedroom'] = parsed[i]['no_bedroom']
    result['no_bathroom'] = parsed[i]['no_bathroom']
    result['sqft'] = parsed[i]['sqft']
    result['asking_price'] = parsed[i]['asking_price']
    result['create_at'] = '4/30/2021'
    result['address'] = {
        "address": parsed[i]['address'],
        "state": parsed[i]['state'],
        "zip": parsed[i]['zip'],
        "neighborhood": parsed[i]["neighborhood"]
    }
    result['neighborhood_score'] = {
        'public_school' : neighborhood['public_school'][0],
        'safety' : neighborhood['safety'][0],
        'nightlife' : neighborhood['nightlife'][0],
        'cost_of_living' : neighborhood['cost_of_living'][0],
        'housing' : neighborhood['housing'][0],
        'walkscore' : walkscore,
        'transitscore' : transitscore,
        'bikescore' : bikescore
    }

    result['neighborhood_score'] = {
        'public_school' : neighborhood['public_school'][0],
        'safety' : neighborhood['safety'][0],
        'nightlife' : neighborhood['nightlife'][0],
        'cost_of_living' : neighborhood['cost_of_living'][0],
        'housing' : neighborhood['housing'][0],
        'walkscore' : walkscore,
        'transitscore' : transitscore,
        'bikescore' : bikescore
    }
    result['bid_detail'] = {
        "waive_inspection": 1,
        "personal_letter": 1,
        "waive_appraisal": 1,
        "all_cash": 1,
        "escalation_clause": 1,
        "increase_downpayment": 1,
        "increase_earnest_money_deposit": 1,
        "closing_date_flexibility": 1,
        "bid_over_list_price": 10
    }

    result_list.append(result)    

print(json.dumps(result_list, indent=4))
with open('result_list.json', 'w', encoding='utf-8') as f:
    json.dump(result_list, f, ensure_ascii=False, indent=4)