import os
import sqlite3
from flask import *

app = Flask(__name__, template_folder='./templates')
app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'db/planets.db'),
    SECRET_KEY='dev',
    USERNAME='admin',
    PASSWORD='default'
))

@app.route('/')
def index():
    db = get_db()
    cur = db.execute('select name, size, distance, ordinality from planets order by ordinality asc')
    planets = cur.fetchall()
    return render_template("planets_overview.html", planets_list=planets)

@app.route('/input', methods=['GET'])
def input():
    return render_template("input.html")

@app.route('/add_planet', methods=['GET','POST'])
def add_planet():
    if request.method == 'GET':
        return render_template("input.html")
    elif request.method == 'POST':
        print(request.form)
        db = get_db()
        db.execute('insert into planets (name, size, distance, ordinality, description) values (?, ?, ?, ?, ?)',
            [request.form['planet_name'], request.form['size'], request.form['distance'], request.form['ordinality'], request.form['description']])
        db.commit()
        flash('Successfully added planet!')
        return redirect(url_for('index'))
    else:
        return make_response(jsonify({'error': 'Method not allowed'}), 405)

@app.route('/detail/<int:planet_id>', methods=['GET'])
def get_planet_for_id(planet_id):
    planet_detail = get_planet_detail(planet_id)
    return jsonify(planet_detail)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Something went wrong'}), 404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)