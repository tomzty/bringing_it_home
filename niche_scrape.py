from os import path

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import json
import csv
from datetime import date

# print out result in console
# j = json.dumps(amazon_price_dict, indent=4)
# print(j)

# set up
web_driver = webdriver.Chrome('/usr/local/bin/chromedriver')


def get_niche_grade(driver: webdriver) -> dict:
    result = {}
    niche_base_url = 'https://www.niche.com/places-to-live/'
    url = niche_base_url + 'brooklyn-kings-ny'
    driver.get(url)

    # card_ids = driver.find_elements_by_css_selector('.search-result__rarity')
    # card_ids = list(filter(lambda x: '#' in x.text, card_ids))
    # card_ids = list(map(lambda card_id: card_id.text[card_id.text.index('#')+1:], card_ids))

    return result




## --------------------- RUN CRAWLER ---------------------##

grade_dict = get_niche_grade(driver=web_driver)


