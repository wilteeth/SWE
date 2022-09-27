from django.shortcuts import render
import requests

def search(request):
    """
    User should only be able to change the searchVal attribute. The other attributes have to be finalised before deployment.
    """
    searchVal = 'pasir'
    returnGeom = 'Y'
    getAddrDetails = 'Y'
    pageNum = 1
    
    response = requests.get('https://developers.onemap.sg/commonapi/search?searchVal={searchVal}&returnGeom={returnGeom}&getAddrDetails={getAddrDetails}&pageNum={pageNum}'.format(searchVal=searchVal, returnGeom=returnGeom, getAddrDetails=getAddrDetails, pageNum=pageNum))
    results = response.json()
    return render(request, 'pages/search.html', results)