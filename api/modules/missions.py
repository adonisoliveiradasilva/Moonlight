import mysql.connector
import jwt
import base64

from flask import jsonify, request 
from flask_restful import Resource
from config import DB_CONFIG
from datetime import datetime
from datetime import datetime, timedelta

class Missions(Resource):
    
    def post(self):
        # Receber os dados da requisição POST
        data = request.get_json()

        # Verificar se os dados necessários foram recebidos
        if 'email' not in data or 'password' not in data:
            return {'message': 'Dados incompletos'}, 400

        # Conexão com o banco de dados usando as configurações do arquivo config.py
        db = mysql.connector.connect(**DB_CONFIG)

        # Criando um cursor para executar consultas
        cursor = db.cursor()

        # Verificar se o usuário existe na tabela missionpassword
        cursor.execute("SELECT * FROM userpassword WHERE email = %s", (data['email'],))
        user_password = cursor.fetchone()

        cursor.close()
        
        password_base64 = base64.b64encode(data['password'].encode()).decode()
        # Se o usuário não existir ou a senha estiver incorreta, retornar erro 401
        if not user_password or user_password[1] != password_base64:
            return {'message': 'Email ou senha incorretos'}, 401

        # Usuário autenticado, buscar informações completas na tabela users
        db = mysql.connector.connect(**DB_CONFIG)
        cursor = db.cursor()

        cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
        user = cursor.fetchone()

        cursor.close()
        db.close()

        # Verificar se o usuário foi encontrado
        if user:
            secret_key = 'TW9vbmxpZ2h0'
            token = jwt.encode({'email': user[0], 'exp': datetime.utcnow() + timedelta(hours=1)}, secret_key, algorithm='HS256')
            
            decoded_token = jwt.decode(token, secret_key, algorithms=['HS256'])
            print(decoded_token)
            
            # Criando um dicionário com os dados do usuário
            user_data = {
                'email': user[0],
                'email_creator': user[1],
                'name': user[2],
                'type_user': user[3],
                'image': user[4],  # Supondo que o campo image já contenha o caminho para a imagem
                'created_at': user[5].strftime('%Y-%m-%d %H:%M:%S') if user[5] else None,
                'updated_at': user[6].strftime('%Y-%m-%d %H:%M:%S') if user[6] else None,
                'token': token
            }

            return {'message': 'Login realizado com sucesso', 'data': user_data}, 200
        else:
            return {'message': 'Usuário não encontrado'}, 404
        
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
