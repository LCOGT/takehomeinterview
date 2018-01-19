import os, sys
import sqlite3
from flask import *
from pprint import pprint

app = Flask(__name__, template_folder='./templates')
app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'db/planets.db'),
    SECRET_KEY='dev',
    USERNAME='admin',
    PASSWORD='default'
))

#Database operations
def connect_db():
    rv = sqlite3.connect(current_app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

def init_db():
    db = get_db()
    with current_app.open_resource('db/planets.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.cli.command('initdb')
def initdb_command():
    init_db()
    print('Initialized the database.')

#Routes
@app.route('/')
def index():
    db = get_db()
    cur = db.execute('select planet_id, name, size, distance, ordinality from planets order by ordinality asc')
    planets = cur.fetchall()
    for row in cur:
        print(row)
    return render_template("planets_overview.html", planets_list=planets)

@app.route('/input', methods=['GET'])
def input():
    return render_template("input.html")

@app.route('/add_planet', methods=['GET','POST'])
def add_planet():
    if request.method == 'GET':
        return render_template("input.html")
    elif request.method == 'POST':
        db = get_db()
        try:
            db.execute('insert into planets (name, size, distance, ordinality, description) values (?, ?, ?, ?, ?)',
                [request.form['planet_name'], request.form['size'], request.form['distance'], request.form['ordinality'], request.form['description']])
            db.commit()
            flash('Successfully added planet!')
            return redirect(url_for('index'))
        except Exception as e:
            print(e)
            return redirect(url_for('error'))
    else:
        return make_response(jsonify({'error': 'Method not allowed'}), 405)

@app.route('/detail/<int:planet_id>', methods=['GET'])
def get_planet_for_id(planet_id):
    db = get_db()
    cur = db.execute('select name, size, distance, ordinality, description from planets where planet_id = \"' + str(planet_id) + '\"')
    planet = cur.fetchone()
    return render_template("detail.html", planet=planet)

@app.route('/error', methods=['GET'])
def error():
    return render_template("error.html", error={'text': "Something went wrong"})

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Something went wrong'}), 404)

# Teardown methods
@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)