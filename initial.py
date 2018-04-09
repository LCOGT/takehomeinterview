import os
import sqlite3
import flask

# See: http://flask.pocoo.org/docs/0.12/tutorial/setup/
app = flask.Flask(__name__)
app.config.from_object(__name__)

# Use os.path.join wherever possible, minimizes issues with Windows vs Unix file path errors
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, os.path.join('db', 'planets.db')),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))


#  For a production app, using SQLAlchemy would be a better option, but for the sake of simplicity
# I'm not going to use it here

# See: http://flask.pocoo.org/docs/0.12/tutorial/setup/
def connect_db():
    rv = sqlite3.connect(flask.current_app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


# See: http://flask.pocoo.org/docs/0.12/tutorial/dbinit/
def init_db():
    db = get_db()
    # See: http://flask.pocoo.org/docs/0.12/tutorial/schema/
    with flask.current_app.open_resource(os.path.join('db', 'schema.sql'), mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


# See: http://flask.pocoo.org/docs/0.12/tutorial/dbcon/
def get_db():
    if not hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db = connect_db()

    return flask.g.sqlite_db


@app.cli.command('initdb')
def init_db_command():
    init_db()


# see: http://flask.pocoo.org/docs/0.12/patterns/sqlite3/
def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


@app.route('/')
def index():
    query = 'SELECT planet_id, planet_name, size, distance, ordinality FROM planets ORDER BY ordinality ASC'

    return flask.render_template('overview.html', planets_list=query_db(query))


# See: http://flask.pocoo.org/docs/0.12/tutorial/views/
@app.route('/add_planet', methods=['GET', 'POST'])
def add_planet():
    if flask.request.method == 'GET':
        return flask.render_template('input.html')

    elif flask.request.method == 'POST':
        db = get_db()
        query = 'insert into planets (planet_name, size, distance, ordinality, description) values (?, ?, ?, ?, ?)'
        args = [flask.request.form['planet_name'], flask.request.form['size'], flask.request.form['distance'],
                flask.request.form['ordinality'], flask.request.form['description']]
        db.execute(query, args)

        try:
            db.commit()

        except Exception as e:
            # see: http://flask.pocoo.org/docs/0.12/patterns/flashing/
            msg = u'Failed to add planet to database.'
            flask.flash(msg, 'error')
            print(msg)

        else:
            msg = u'Succesfully added planet!'
            flask.flash(msg, 'success')
            print(msg)
        return flask.redirect(flask.url_for('index'))



@app.route('/input', methods=['GET'])
def input():
    return flask.render_template("input.html")


@app.route('/detail/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    query = "SELECT planet_name, size, distance, ordinality, description FROM planets WHERE planet_id = {}".format(
        str(planet_id))
    flask.render_template('detail.html', planet=query_db(query, one=True))


@app.errorhandler(404)
def not_found(error):
    return flask.render_template('404.html')


@app.teardown_appcontext
def close_db(error):
    if hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db.close()


if __name__ == '__main__':
    app.run(debug=True)
