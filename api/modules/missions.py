from aifc import Error
from sqlite3 import connect
import mysql.connector
import base64

from flask import jsonify, request 
from flask_restful import Resource
from config import DB_CONFIG
from datetime import datetime
from datetime import datetime, timedelta

class Missions(Resource):
    def get(self):
    # Conexão com o banco de dados usando as configurações do arquivo config.py
        db = mysql.connector.connect(**DB_CONFIG)

        # Criando um cursor para executar consultas
        cursor = db.cursor()

        # Exemplo de consulta SQL com INNER JOIN para obter as informações necessárias
        cursor.execute("""
            SELECT 
                mission.id, 
                mission.email_creator, 
                mission.name_rocket, 
                rocket.image AS image_rocket,
                mission.name, 
                mission.departure_date, 
                mission.return_date, 
                mission.route,
                mission.place, 
                mission.created_at, 
                mission.updated_at
            FROM 
                mission
                INNER JOIN rocket ON mission.name_rocket = rocket.name
        """)

        # Obtendo os resultados da consulta
        missions = cursor.fetchall()

        # Fechando o cursor e a conexão com o banco de dados
        cursor.close()
        db.close()

        missions_list = []
        # for i, row in enumerate(missions) :
        
        for row in missions:
            image_bytes = row[3]
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')

            # Constrói um dicionário para cada tupla
            data = {
                'id': row[0],
                'email_creator': row[1],
                'name_rocket': row[2],
                'image_rocket': image_base64 ,
                'name': row[4],
                'departure_date': row[5].strftime('%Y-%m-%d') if row[5] else None,
                'return_date': row[6].strftime('%Y-%m-%d') if row[6] else None,
                'route': row[7],
                'place': row[8],
                'created_at': row[9].strftime('%Y-%m-%d %H:%M:%S') if row[9] else None,
                'updated_at': row[10].strftime('%Y-%m-%d %H:%M:%S') if row[10] else None,
            }
            # Adiciona o dicionário à lista
            missions_list.append(data)

        # Retornando os resultados como JSON
        return jsonify(missions_list)

    def post(self):
        try:
            data = request.get_json()
            # Extraia os dados do payload
            name = data.get('name')
            departure_date = data.get('departure_date')
            return_date = data.get('return_date')
            email_creator = data.get('email_creator')
            name_rocket = data.get('name_rocket')
            place = data.get('place')
            route = data.get('route')

            db = mysql.connector.connect(**DB_CONFIG)
            cursor = db.cursor()

            # Conecte-se ao banco de dados e insira os dados

            sql = """
                INSERT INTO mission (name, departure_date, return_date, email_creator, name_rocket, place, route, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                """

            cursor.execute(sql, (name, departure_date, return_date, email_creator, name_rocket, place, route))
            db.commit()
            
            cursor.close()
            db.close()
            return {'message': 'Success'}, 201
        except Error as e:
            return {'message': str(e)}, 500
        except Exception as e:
            return {'message': 'Failed to decode JSON object: ' + str(e)}, 400

    def put(self):
        try:
            data = request.get_json()
            print(data)

            # Extraia os dados do payload
            mission_id = data.get('id')
            name = data.get('name')
            departure_date = data.get('departure_date')
            return_date = data.get('return_date')
            email_creator = data.get('email_creator')
            name_rocket = data.get('name_rocket')
            place = data.get('place')
            route = data.get('route')

            if not mission_id:
                return {'message': 'mission_id is required'}, 400

            db = mysql.connector.connect(**DB_CONFIG)
            cursor = db.cursor()

            # Conecte-se ao banco de dados e atualize os dados
            sql = """
                UPDATE mission 
                SET name = %s, departure_date = %s, return_date = %s, email_creator = %s, name_rocket = %s, place = %s, route = %s, updated_at = NOW()
                WHERE id = %s
            """

            cursor.execute(sql, (name, departure_date, return_date, email_creator, name_rocket, place, route, mission_id))
            db.commit()
            
            cursor.close()
            db.close()
            return {'message': 'Success'}, 200
        except Error as e:
            return {'message': str(e)}, 500
        except Exception as e:
            return {'message': 'Failed to decode JSON object: ' + str(e)}, 400
   