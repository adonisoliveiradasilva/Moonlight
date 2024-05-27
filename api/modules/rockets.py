import mysql.connector
import jwt
import base64

from flask import jsonify, request 
from flask_restful import Resource
from config import DB_CONFIG

class Rockets(Resource):
    def get(self):
    # Conexão com o banco de dados usando as configurações do arquivo config.py
        db = mysql.connector.connect(**DB_CONFIG)

        # Criando um cursor para executar consultas
        cursor = db.cursor()

        # Exemplo de consulta SQL com INNER JOIN para obter as informações necessárias
        cursor.execute("""
            SELECT 
                *
            FROM 
                rocket
        """)

        # Obtendo os resultados da consulta
        rocket = cursor.fetchall()

        # Fechando o cursor e a conexão com o banco de dados
        cursor.close()
        db.close()

        rockets_list = []
        # for i, row in enumerate(missions) :
        
        for row in rocket:
            image_bytes = row[2]
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')

            # Constrói um dicionário para cada tupla
            data = {
                'name': row[0],
                'email_creator': row[1],
                'image': image_base64 ,
                'created_at': row[3].strftime('%Y-%m-%d %H:%M:%S') if row[3] else None,
                'updated_at': row[4].strftime('%Y-%m-%d %H:%M:%S') if row[4] else None,
            }
            # Adiciona o dicionário à lista
            rockets_list.append(data)

        # Retornando os resultados como JSON
        return jsonify(rockets_list)