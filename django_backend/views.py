from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
from rest_framework import status


"""
Class based view for base search function. Accepts 1 parameter: search_val from GoogleMaps searchbar.
"""
class SearchView(APIView):
    def get(self, request):
        if 'search_val' in request.GET:
            search_val = request.GET['search_val']

            queryset = models.AllFlat.objects.using('flats').filter(street_name__contains=search_val).values('block', 'street_name', 'flat_type', 'storey_range', 'floor_area_sqm', 'flat_model', 'remaining_lease', 'predictedprice', 'likes')[:5]
            if not queryset:
                return Response({})
            else:
                query_list = list(queryset)

            return Response(query_list, status=status.HTTP_200_OK, content_type='application/json')

        return Response({})


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

            return Response(price, status=status.HTTP_200_OK, content_type='application/json')

        return Response({})

   