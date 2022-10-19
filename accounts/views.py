from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer
from .models import User
from rest_framework.authentication import BasicAuthentication
from rest_framework import generics, status
from django.contrib.auth import login

# Class based view to get user details using Basic Authentication
class UserDetailAPI(APIView):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        user = User.objects.get(email=request.user.email)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Class based view for user registration
class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny),
    serializer_class = UserSerializer

# Class based view for user login
class LoginView(APIView):
    # This view should be accessible also for unauthenticated users
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(
            data=self.request.data,
            context = { 'request': self.request }
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)

