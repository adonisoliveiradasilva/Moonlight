import mysql.connector
from flask import jsonify, request 
from flask_restful import Resource
from config import DB_CONFIG
from datetime import datetime
import base64

class Login(Resource):
    
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

        # Verificar se o usuário existe na tabela userpassword
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
            # Criando um dicionário com os dados do usuário
            user_data = {
                'email': user[0],
                'email_creator': user[1],
                'name': user[2],
                'type_user': user[3],
                'image': user[4],  # Supondo que o campo image já contenha o caminho para a imagem
                'created_at': user[5].strftime('%Y-%m-%d %H:%M:%S') if user[5] else None,
                'updated_at': user[6].strftime('%Y-%m-%d %H:%M:%S') if user[6] else None
            }

            return {'message': 'Login realizado com sucesso', 'data': user_data}, 200
        else:
            return {'message': 'Usuário não encontrado'}, 404
        
    def get(self):
        # Conexão com o banco de dados usando as configurações do arquivo config.py
        db = mysql.connector.connect(**DB_CONFIG)

        # Criando um cursor para executar consultas
        cursor = db.cursor()

        # Exemplo de consulta SQL
        cursor.execute("SELECT * FROM users")

        # Obtendo os resultados da consulta
        results = cursor.fetchall()

        # Fechando o cursor e a conexão com o banco de dados
        cursor.close()
        db.close()

        # Retornando os resultados como JSON
        return jsonify(results)  # Altere aqui para retornar um dicionário ou lista, se necessário
