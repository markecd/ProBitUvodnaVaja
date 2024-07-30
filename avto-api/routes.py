from flask import request, jsonify
from app import app, db
from models import Car, Owner
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

 
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    owner = Owner.query.filter_by(username=username).first()
    if owner and password == owner.password:
        access_token = create_access_token(identity={'username': owner.username, 'id': owner.id})
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad username or password"}), 401

    
@app.route('/cars', methods=['GET'])
def get_cars():
    cars = Car.query.all()
    return jsonify([car.to_dict() for car in cars])

@app.route('/cars', methods=['POST'])
def add_car():
    data = request.get_json()
    new_car = Car(
        brand=data['brand'],
        model=data['model'],
        year=data['year'],
        price=data['price'],
        owner_id=data['owner_id']
    )
    db.session.add(new_car)
    db.session.commit()
    return jsonify(new_car.to_dict()), 201

@app.route('/cars/<int:id>', methods=['PUT'])
def update_car(id):
    car = Car.query.get_or_404(id)
    data = request.get_json()
    car.brand = data['brand']
    car.model = data['model']
    car.year = data['year']
    car.price = data['price']
    db.session.commit()
    return jsonify(car.to_dict())

@app.route('/cars/<int:id>', methods=['DELETE'])
def delete_car(id):
    car = Car.query.get_or_404(id)
    db.session.delete(car)
    db.session.commit()
    return '', 204