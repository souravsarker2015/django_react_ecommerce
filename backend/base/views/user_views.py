from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.serializers import UserSerializerWithToken, UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #     token['username'] = user.username
    #     token['email'] = user.email
    #
    #     return token
    def validate(self, attrs):
        data = super().validate(attrs)
        # data["username"] = self.user.username
        # data["email"] = self.user.email

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'], )
def register_user(request):
    data = request.data
    try:
        print(request.data)
        user = User.objects.create(
            first_name=data.get('name'),
            username=data.get('email'),
            email=data.get('email'),
            password=make_password(data.get('password')),
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        data = {
            'status': status.HTTP_400_BAD_REQUEST,
            'message': "user with this email already exists",
        }
        return Response(data)


@api_view(['GET'], )
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
    # return Response(products)


@api_view(['GET'], )
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
    # return Response(products)


@api_view(['PUT'], )
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    print(request.data)
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data

    user.first_name = data.get('name', '')
    # user.username = data.get('email', '')
    user.email = data.get('email', '')

    if data.get('password') != '':
        user.password = make_password(data.get('password')),

    user.save()
    return Response(serializer.data)
    # return Response(products)
