from flask import Flask
from LCOapp.views.index import bp as index_bp
from LCOapp.views.createplanet import bp as createplanet_bp

app = Flask(__name__)

app.register_blueprint(index_bp)
app.register_blueprint(createplanet_bp)
