from flask import render_template, url_for, flash, redirect
from flaskapp import app, db
from flaskapp.forms import RegistrationForm
from flaskapp.models import Planet

@app.route("/")
@app.route("/home")
def home():
    planets = Planet.query.all()
    return render_template('home.html', planets=planets)

@app.route("/detail/<name>")
def detail(name):
    planet = Planet.query.filter_by(name=name).first_or_404()
    return render_template('detail.html', title='Detail Page', planet=planet)

@app.route("/submit", methods=['GET', 'POST'])
def submit():
    form = RegistrationForm()
    if form.validate_on_submit():
        planet = Planet(name=form.name.data, size=form.size.data, distance=form.distance.data, ordinality=form.ordinality.data, description=form.description.data)
        db.session.add(planet)
        db.session.commit()
        flash('Planet added', 'success')
        return redirect(url_for('home'))
    return render_template('submit.html', title='submit', form=form)
