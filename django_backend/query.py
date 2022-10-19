from django.db import connection, connections

def find_flats():
    with connections['flats'].cursor() as cursor:
        cursor.execute('SELECT block, street_name, flat_type, PredictedPrice FROM "5_room_flat" WHERE town LIKE "%ang mo kio%" COLLATE NOCASE LIMIT 10')

        results = cursor.fetchall()

        for row in results:
            print(row)

find_flats()