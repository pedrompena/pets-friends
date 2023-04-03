from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Clients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rol = db.Column(db.String, nullable=True)
    name = db.Column(db.String)
    surname = db.Column(db.String)
    email = db.Column(db.String,  unique=True)
    password = db.Column(db.String)
    avatar = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)
    city = db.Column(db.String)


    def __repr__(self):
        return '<Clients %r>' % self.id

    def serialize(self):
        return {'id': self.id,
                'rol': self.rol,
                'name': self.name,
                'surname': self.surname,
                'avatar': self.avatar,
                'city': self.city,
                'description': self.description,
                'email': self.email}


class Pets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    description = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        'clients.id'), nullable=False)

    def __repr__(self):
        return '<Pets %r>' % self.id

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'image': self.image,
                'description': self.description,
                'owner_id': self.owner_id}


class Services(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    price = db.Column(db.Integer)
    service_type = db.Column(db.Integer)
    description = db.Column(db.String)
    image = db.Column(db.String)
    carer_id = db.Column(db.Integer, db.ForeignKey(
        'clients.id'), nullable=False)

    def __repr__(self):
        return '<Services %r>' % self.id

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'price': self.price,
                'service_type': self.service_type,
                'description': self.description,
                'image': self.image,
                'carer_id': self.carer_id}


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey(
        'chat.id'), nullable=False)
    date = db.Column(db.String)
    content = db.Column(db.String)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)

    def __repr__(self):
        return '<Message %r' % self.id
    
    def serialize(self):
        return {'id': self.id,
                'chat_id': self.chat_id,
                'date': self.date,
                'content': self.content,
                'client_id': self.client_id}


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_1_id = db.Column(
        db.Integer, db.ForeignKey('clients.id'), nullable=False)
    client_2_id = db.Column(
        db.Integer, db.ForeignKey('clients.id'), nullable=False)
    
    client_1 = db.relationship('Clients', foreign_keys=[client_1_id])
    client_2 = db.relationship('Clients', foreign_keys=[client_2_id])

    def __repr__(self):
        return f'<Chat {self.id} ({self.client_1_id}, {self.client_2_id})>'

    def serialize(self):
        return {'id': self.id,
                'client_1_id': self.client_1_id,
                'client_1_name': self.client_1.name,
                'client_1_surname': self.client_1.surname,
                'client_1_avatar': self.client_1.avatar,
                'client_2_id': self.client_2_id,
                'client_2_name': self.client_2.name,
                'client_2_surname': self.client_2.surname,
                'client_2_avatar': self.client_2.avatar,}


class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey(
        'clients.id'), nullable=False)
    cloud_id = db.Column(db.String)
    url = db.Column(db.String)

    def __repr__(self):
        return '<Images %r>' % self.id

    def serialize(self):
        return {'id': self.id,
                'client_id': self.client_id,
                'cloud_id': self.cloud_id,
                'url': self.url}