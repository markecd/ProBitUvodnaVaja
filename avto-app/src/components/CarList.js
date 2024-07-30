import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CarList = ({ cars, username, onUpdateCar, onDeleteCar , onAddCar}) => {

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCar, setNewCar] = useState({ brand: '', model: '', year: '', price: '' });

  const handleAdd = () => {
    setShowAddModal(true);
  }

  const handleEdit = (car) => {
    setCurrentCar(car);
    setShowEditModal(true);
  };

  const handleDelete = (car) => {
    setCurrentCar(car);
    setShowDeleteModal(true);
  };

  const handleUpdate = () => {
    onUpdateCar(currentCar);
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    onDeleteCar(currentCar);
    setShowDeleteModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleNewCarChange = (e) => {
    const { name, value } = e.target;
    setNewCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleAddCar = () => {
    onAddCar(newCar);
    setShowAddModal(false);
  };

  return (
    <div className="container">
      <div>
        <button className='btn btn-primary mr-2' onClick={handleAdd}>Add car</button>
      </div>
      <div className="row">
        {cars.map(car => (
          <div key={car.id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{car.brand + ' ' + car.model}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Year: {car.year}</h6>
                <p className="card-text">Price: {car.price}€</p>
                <p className="card-text">Owner: {car.owner.username}</p>
                {car.owner.username === username && (
                  <div>
                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(car)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(car)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Form.Group controlId="formBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={newCar.brand}
                  onChange={handleNewCarChange}
                />
              </Form.Group>
              <Form.Group controlId="formModel">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  name="model"
                  value={newCar.model}
                  onChange={handleNewCarChange}
                />
              </Form.Group>
              <Form.Group controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={newCar.year}
                  onChange={handleNewCarChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newCar.price}
                  onChange={handleNewCarChange}
                />
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => showAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCar}>
            Add Car
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentCar && (
            <Form>
              <Form.Group controlId="formBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={currentCar.brand}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formModel">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  name="model"
                  value={currentCar.model}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  name="year"
                  value={currentCar.year}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentCar.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this car?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CarList;
