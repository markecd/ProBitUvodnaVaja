from app import app, db
from models import Car, Owner

def tables_fill():
    with app.app_context():
        db.drop_all()
        db.create_all()

        owner1 = Owner(name="Lan", surname="Kos", username="lancikos1", password="geslo1")
        owner2 = Owner(name="Luka", surname="Slapnik", username="lukas2", password="geslo1")
        owner3 = Owner(name="Miha", surname="Golcer", username="mgolcer123", password="geslo1")
        
        db.session.add(owner1)
        db.session.add(owner2)
        db.session.add(owner3)
        db.session.commit()

        car1 = Car(brand="Toyota", model="Corolla", year=2020, price=20000, owner_id=owner1.id)
        car2 = Car(brand="Honda", model="Civic", year=2019, price=18000, owner_id=owner2.id)
        car3 = Car(brand="Ford", model="Focus", year=2021, price=22000, owner_id=owner1.id)
        car4 = Car(brand="Tesla", model="Model 3", year=2022, price=35000, owner_id=owner3.id)

        db.session.add(car1)
        db.session.add(car2)
        db.session.add(car3)
        db.session.add(car4)
        db.session.commit()

        print("Data added")

if __name__ == '__main__':
    tables_fill()
