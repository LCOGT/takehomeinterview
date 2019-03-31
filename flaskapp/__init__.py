from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ce864a81273d8d814460e6b0b65a60ac'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
db = SQLAlchemy(app)

#import routes after app initialization to prevent circular imports
from flaskapp import routes
