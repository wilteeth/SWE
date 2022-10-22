# Generated by Django 4.0.5 on 2022-10-22 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favourite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('block', models.IntegerField(blank=True, null=True)),
                ('street_name', models.TextField(blank=True, null=True)),
                ('predictedprice', models.IntegerField(blank=True, db_column='PredictedPrice', null=True)),
                ('flat_type', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'favourite',
                'managed': False,
            },
        ),
    ]
