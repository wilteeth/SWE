from django.shortcuts import render
import requests
import json
from django.db import connections
import pandas as pd

def search(request):
    """
    User should only be able to change the searchVal attribute. The other attributes have to be finalised before deployment.
    """
    returnGeom = 'Y'
    getAddrDetails = 'Y'
    pageNum = 1

    if 'searchVal' in request.GET:

        searchVal = request.GET['searchVal']

        url = 'https://developers.onemap.sg/commonapi/search?searchVal={searchVal}&returnGeom={returnGeom}&getAddrDetails={getAddrDetails}&pageNum={pageNum}'.format(searchVal=searchVal, returnGeom=returnGeom, getAddrDetails=getAddrDetails, pageNum=pageNum)
        
        response = requests.get(url=url)
    
        searchResult = response.json()

        with connections['flats'].cursor() as cursor:
            cursor.execute('SELECT block, street_name, flat_type, PredictedPrice FROM "all_flat" WHERE town LIKE "%{searchVal}%" COLLATE NOCASE LIMIT 10'.format(searchVal=searchVal))

            # results = cursor.fetchall()

            r = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]

            result = json.dumps(r)

            print(result)

            

    else:
        searchResult = {}


    return render(request, 'pages/search.html', {'searchResult': searchResult})

