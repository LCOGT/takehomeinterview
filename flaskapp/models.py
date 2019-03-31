from flaskapp import db

class Planet(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(30), unique=True, nullable=False)
    size=db.Column(db.Float(60), nullable=False)
    distance=db.Column(db.Float, nullable=False)
    ordinality=db.Column(db.Integer, unique=True, nullable=False)
    description=db.Column(db.String(500))

    def __repr__(self):
        return f"Planet('{self.name}', '{self.size}', '{self.distance}', '{self.ordinality}', '{self.description}')"
