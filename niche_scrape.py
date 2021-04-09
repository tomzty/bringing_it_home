from os import path

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import json
import csv
from datetime import date
import pandas as pd
import numpy as np

# print out result in console
# j = json.dumps(amazon_price_dict, indent=4)
# print(j)

# set up
web_driver = webdriver.Chrome('/usr/local/bin/chromedriver')


def get_niche_grade(driver: webdriver, property_id: int) -> pd.DataFrame:
    neighborhood = 'WASHINGTON' # getNeighborhood(property_id)
    result = []
    niche_base_url = 'https://www.niche.com/places-to-live/'
    url = niche_base_url + 'washington-dc-district-of-columbia-dc'
    driver.get(url)

    grades = driver.find_elements_by_css_selector('.profile-grade--two .niche__grade')
    keys = ['public_school','safety','jobs','nightlife','cost_of_living','housing']
    values = [] 
    for i in grades:
        text_list = i.text.split()
        if len(text_list) > 0:
            values.append(text_list[1])

    result = {}
    for k,v in zip(keys,values):
        result[k] = [v]
    
    result['neighborhood'] = [neighborhood]
    df = pd.DataFrame.from_dict(result)

    return df


