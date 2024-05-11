from flask import Flask
from flask_restful import Api
from modules.login import Login
from modules.missions import Missions
from config import DB_CONFIG
from flask_cors import CORS

import mysql.connector

app = Flask(__name__)
api = Api(app)

CORS(app)

db = mysql.connector.connect(**DB_CONFIG, auth_plugin='mysql_native_password')

api.add_resource(Login, '/login')
api.add_resource(Missions, '/missions')

if __name__ == '__main__':
    app.run(debug=True)
