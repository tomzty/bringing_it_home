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

web_driver = webdriver.Chrome('/usr/local/bin/chromedriver')

df = mls.get_listings(web_driver)
print(df)
neighborhood = niche.get_niche_grade(web_driver,1)
print(neighborhood)