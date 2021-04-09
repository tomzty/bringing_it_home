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

# address --> full address, zipcode, state, neighborhood
# no_bedroom
# no_bathroom
# sqft
# asking_Pr

# return a list of full_address
# dtype: [String]
def get_full_address(driver: webdriver) -> []:
    address_list = []
    addresses_1 = driver.find_elements_by_css_selector('.bfg-gallery-address')
    addresses_2 = driver.find_elements_by_css_selector('.bfg-gallery-address2')
    
    for add_1, add_2 in zip(addresses_1, addresses_2):
        address_list.append(add_1.text + add_2.text)

    return address_list

# return a list of neighborhood, state, zipcode
# dtype: [String], [String], [int]
def get_neighborhood_state_zip(driver: webdriver) -> []:
    state_list = []
    zipcode_list = []
    neighborhood_list = []
    addresses_2 = driver.find_elements_by_css_selector('.bfg-gallery-address2')
    
    for t in addresses_2:
        t_list = t.text.split()
        neighborhood_list.append(t_list[0][:-1])
        state_list.append(t_list[1])
        zipcode_list.append(float(t_list[2]))
    
    return neighborhood_list, state_list, zipcode_list

# return a list of no_bedr, no_bathr, sqft
# dtype: [int], [int], [int] (-1 if data is unavailable)
def get_bedr_bathr_sqft(driver: webdriver) -> []:
    bedr_list = []
    bathr_list = []
    sqft_list = []
    l = driver.find_elements_by_css_selector('.bfg-gallery-features')
    
    for t in l:
        t_list = t.text.split(' | ')
        print(t_list)
        if 'BR' in t_list[0]:
            bedr_list.append(int(t_list[0].split()[0]))
        if 'BA' in t_list[1]:
            bathr_list.append(int(t_list[1].split()[0]))
        if 'Sqft' in t_list[-1]:
            sqft = int(t_list[-1].split()[0].replace(',',''))
            sqft_list.append(sqft)
        else:
            bedr_list.append(-1)
            bathr_list.append(-1)
            sqft_list.append(-1)
        
    return bedr_list, bathr_list, sqft_list


# return a list of asking price
# dtype: [float]
def get_price_list(driver: webdriver) -> []:
    price_list = []
    asking_prices = driver.find_elements_by_css_selector('.bfg-gallery-price')
    for i in asking_prices:
        price_str = i.text.split()[2][1:].replace(',','')
        price_list.append(float(price_str))

    return price_list
def get_listings(driver: webdriver) -> []:
    result = []
    listing_base_url = 'https://griffithpg.com/properties/'
    driver.get(listing_base_url)

    # asking_price_list = get_price_list(driver)
    # full_address_list = get_full_address(driver)
    # neighborhood_list, state_list, zipcode_list = get_neighborhood_state_zip(driver)
    bedr_list, bathr_list, sqft_list = get_bedr_bathr_sqft(driver)
    return result

## --------------------- RUN CRAWLER ---------------------##

listings = get_listings(driver=web_driver)


