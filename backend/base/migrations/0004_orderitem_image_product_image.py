# Generated by Django 4.2.2 on 2023-06-11 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_order_shippingaddress_review_orderitem'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]