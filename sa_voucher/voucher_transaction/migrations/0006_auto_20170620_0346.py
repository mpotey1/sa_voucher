# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-20 07:46
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('voucher_transaction', '0005_auto_20170620_0337'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='voucher',
            name='payment_options',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='transfer_payment',
        ),
    ]