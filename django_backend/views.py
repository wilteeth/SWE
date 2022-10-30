from django.shortcuts import render
import requests
import json
from django.db import connections
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models

def search(request):
    """
    User should only be able to change the searchVal attribute. The other attributes have to be finalised before deployment.
    """
    returnGeom = 'Y'
    getAddrDetails = 'Y'
    pageNum = 1

    if 'searchVal' in request.GET:

        searchVal = request.GET['searchVal']
        flat_type = request.GET['flat_type']

        url = 'https://developers.onemap.sg/commonapi/search?searchVal={searchVal}&returnGeom={returnGeom}&getAddrDetails={getAddrDetails}&pageNum={pageNum}'.format(searchVal=searchVal, returnGeom=returnGeom, getAddrDetails=getAddrDetails, pageNum=pageNum)
        
        response = requests.get(url=url)
    
        searchResult = response.json()

        with connections['flats'].cursor() as cursor:
            cursor.execute('SELECT block, street_name, flat_type, PredictedPrice FROM "all_flat" WHERE street_name LIKE "%{searchVal}%" and flat_type LIKE "%{flat_type}%" COLLATE NOCASE LIMIT 1'.format(searchVal=searchVal, flat_type=flat_type))
            
            # results = cursor.fetchall()

            r = [dict((cursor.description[i][0], value) \
               for i, value in enumerate(row)) for row in cursor.fetchall()]

            result = json.dumps(r)

            print(result)

            

    else:
        searchResult = {}


    return render(request, 'pages/search.html', {'searchResult': searchResult})

# class SearchView(APIView):
#     def get(self, request):
#         if 'search_val' in request.GET:
#             search_val = request.GET['search_val']

#             queryset = models.AllFlat.objects.using('flats').filter(town__contains=search_val).values('predictedprice')[:1]


"""
Class based view for comparison function. Accepts 2 parameters: search_val from GoogleMaps searchbar, and flat_type from custom user select
"""
class ComparisonView(APIView):  
    def get(self, request):
        if 'search_val' and 'flat_type' in request.GET: 
            search_val = request.GET['search_val']
            flat_type = request.GET['flat_type']

            queryset = models.AllFlat.objects.using('flats').filter(street_name__contains=search_val, flat_type__contains=flat_type).values('predictedprice')[:1]
            if not queryset:
                return Response({})
            else:
                price = queryset[0]
                result = json.dumps(price)

            return Response(result)

        return Response({})

   