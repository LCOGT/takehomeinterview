from flask import Blueprint, render_template
import glob

bp = Blueprint('name', __name__, template_folder='templates')

def fetch_planets():
	final_planets = []
	planets = glob.glob('LCOapp/planets/*.planet')

	for planet in planets:
		with open(planet) as _file:
			final_planets.append(_file.read())
		_file.close()

	return final_planets

@bp.route('/')
def show():
    return render_template('index.html', planets=fetch_planets())