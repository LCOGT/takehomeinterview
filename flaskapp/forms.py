from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError, NumberRange
from flaskapp.models import Planet

class RegistrationForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=1,max=30)])
    size = FloatField('Size', validators=[DataRequired(), NumberRange(min=0)])
    distance = FloatField('Distance', validators=[DataRequired(), NumberRange(min=0)])
    ordinality = IntegerField('Ordinality', validators=[DataRequired(), NumberRange(min=1)])
    description = TextAreaField('Description (max 500 characters)', validators=[Length(max=500)])
    submit = SubmitField('Submit')

    def validate_name(self, name):
        name = Planet.query.filter_by(name=name.data).first()
        if name:
            raise ValidationError('This planet has already been added')

    def validate_ordinality(self, ordinality):
        ordinality = Planet.query.filter_by(ordinality=ordinality.data).first()
        if ordinality:
            raise ValidationError('A planet of this ordinality has already been added')
