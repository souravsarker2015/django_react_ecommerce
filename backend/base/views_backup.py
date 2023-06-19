# from django.contrib.auth.hashers import make_password
# from django.contrib.auth.models import update_last_login, User
# from django.shortcuts import render
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from rest_framework_simplejwt.settings import api_settings
#
# from .models import Product
# # from .products import products
# from django.http import JsonResponse
# from rest_framework.decorators import api_view, permission_classes
#
# from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
#
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
#
#
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     # @classmethod
#     # def get_token(cls, user):
#     #     token = super().get_token(user)
#     #     token['username'] = user.username
#     #     token['email'] = user.email
#     #
#     #     return token
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         # data["username"] = self.user.username
#         # data["email"] = self.user.email
#
#         serializer = UserSerializerWithToken(self.user).data
#         for k, v in serializer.items():
#             data[k] = v
#
#         return data
#
#
# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
#
#
# @api_view(['POST'], )
# def register_user(request):
#     data = request.data
#     try:
#         user = User.objects.create(
#             first_name=data.get('name'),
#             username=data.get('email'),
#             email=data.get('email'),
#             password=make_password(data.get('password')),
#         )
#         serializer = UserSerializerWithToken(user, many=False)
#         return Response(serializer.data)
#     except Exception as e:
#         data = {
#             'status': status.HTTP_400_BAD_REQUEST,
#             'message': "user with this email already exists",
#         }
#         return Response(data)
#
#
# @api_view(['GET'], )
# @permission_classes([IsAdminUser])
# def get_users(request):
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data)
#     # return Response(products)
#
#
# @api_view(['GET'], )
# @permission_classes([IsAuthenticated])
# def get_user_profile(request):
#     user = request.user
#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)
#     # return Response(products)
#
#
# @api_view(["GET"], )
# def get_routes(request):
#     routes = ["products/", "products/id", "products/create", ]
#     return Response(routes)
#
#
# @api_view(['GET'], )
# def get_products(request):
#     products = Product.objects.all()
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)
#     # return Response(products)
#
#
# @api_view(['GET'], )
# def get_product(request, pk):
#     product = Product.objects.filter(_id=pk).first()
#     serializer = ProductSerializer(product)
#     # for i in products:
#     #     if i['_id'] == pk:
#     #         product = i
#     return Response(serializer.data)
