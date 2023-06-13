from django.shortcuts import render
from rest_framework.response import Response

from .models import Product
# from .products import products
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .serializers import ProductSerializer


@api_view(["GET"], )
def get_routes(request):
    routes = ["products/", "products/id", "products/create", ]
    return Response(routes)


@api_view(['GET'], )
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
    # return Response(products)


@api_view(['GET'], )
def get_product(request, pk):
    product = Product.objects.filter(_id=pk).first()
    serializer = ProductSerializer(product)
    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    return Response(serializer.data)
