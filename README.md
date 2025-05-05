# Moonlight – Sistema de Controle de Missões Espaciais da NASA

Este projeto é uma aplicação web para gerenciamento de missões espaciais da NASA. Ele permite:

- Criação de novas missões espaciais
- Controle de acesso para astronautas, administradoras de Houston, foguetes e missões
- Base de dados inicial com as missões Apollo
- Foguetes e astronautas do Projeto Apollo já cadastrados
- Administradoras baseadas nas personagens do filme "Estrelas Além do Tempo"

## Tecnologias Utilizadas

### UI (Frontend)

- Angular 16
- Angular Material (`ng add @angular/material`)
- PrimeNG
- Font Awesome (`npm install @fortawesome/fontawesome-free`)
- Yarn (gerenciador de pacotes)

### API (Backend)

- Flask 3.0.3

## Como Rodar o Projeto

### UI
1. Acesse a pasta da interface:
- cd Moonlight/ui
2. Instale as dependências:
- yarn install
3. Inicie o projeto:
- npm start
4. Acesse no navegador:
- http://localhost:4200

### API

1. Acesse a pasta da API:
- cd Moonlight/api
2. Instale as dependências:
- pip install -r requirements.txt
3. Inicie o servidor:
- python app.py
4. Acesse no navegador:
- http://localhost:5000

## Requisitos

- Node.js ^18.17
- Yarn
- Python 3.x
