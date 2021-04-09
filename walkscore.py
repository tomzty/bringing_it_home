from geopy import Nominatim
from geopy import MapQuest
import json
import urllib

MAPQUEST_API_KEY = 'M4GKnzAc6Pyz418vyJyXlmSu4PqSsOFR'

def get_location(location_str):
    locator = Nominatim(user_agent='myGeocoder')
    location = locator.geocode(location_str)
    if not location:
        locator = MapQuest(MAPQUEST_API_KEY)
        location = locator.geocode(location_str)
    return location

def walkscore(location_str):
    location = get_location(location_str)
    website = 'https://api.walkscore.com/score?format=json&lat=' + str(location.latitude) + '&lon=' + str(location.longitude) +'&transit=1&bike=1&wsapikey=b1c9cb0cbfab72947704a84addb4a9e9'
    with urllib.request.urlopen(website) as url:
        data = json.loads(url.read().decode())
    print('walkscore is ' + str(data['walkscore']) + '\n')
    print('transit score is ' + str(data['transit']['score']) + '\n')
    print('bike score is ' + str(data['bike']['score']) + '\n')

def get_scores(location_str):
    location = get_location(location_str)
    website = 'https://api.walkscore.com/score?format=json&lat=' + str(location.latitude) + '&lon=' + str(location.longitude) +'&transit=1&bike=1&wsapikey=b1c9cb0cbfab72947704a84addb4a9e9'
    with urllib.request.urlopen(website) as url:
        data = json.loads(url.read().decode())

    return str(data['walkscore']), str(data['transit']['score']), str(data['bike']['score'])

var  = input('Enter Address: ')
walkscore(var)