# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-06-20 07:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('voucher_transaction', '0004_auto_20170620_0334'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='voucher',
            name='date_2',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='date_3',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='date_4',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_amount_2',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_amount_3',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_amount_4',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_descript_2',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_descript_3',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_descript_4',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_invoice_2',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_invoice_3',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_invoice_4',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_type_2',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_type_3',
        ),
        migrations.RemoveField(
            model_name='voucher',
            name='expense_type_4',
        ),
    ]
