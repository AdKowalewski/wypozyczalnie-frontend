import React, { useState, useEffect, useContext } from 'react';
import RentalService from '../services/RentalService';
import { useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import 'bulma/css/bulma.min.css';

const UserProfile = () => {

    const [activeRentals, setActiveRentals] = useState([]);
    const [unpaidRentals, setUnpaidRentals] = useState([]);

    const { id } = useParams();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [loading, setLoading] = useState(false);

    const stopRental = (rental_id) => {
        return RentalService.stopRental(rental_id).then((res) => {
            console.log(res);
        });
    };

    useEffect(() => {
        UserService.getUserById(id).then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setSurname(res.data.surname);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        RentalService.getUserActiveRentals().then((res) => {
            console.log(res.data);
            setActiveRentals(res.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        RentalService.getUserUnpaidRentals().then((res) => {
            console.log(res.data);
            setUnpaidRentals(res.data);
            setLoading(false);
        });
    }, []);

    const payForRental = (rental_id) => {
        RentalService.payRental(rental_id).then((res) => {
            console.log(res);
            setUnpaidRentals(unpaidRentals.filter((rental) => rental.id !== rental_id));
        });
    };

    return (
        <div>
            <h1 style={{fontWeight: 'bold', marginTop: '20px'}}>{name + ' ' + surname}</h1>
            <br/>
            {unpaidRentals.length !== 0 ? <h2 style={{fontWeight: 'bold'}}>My Unpaid Rentals:</h2> : <h2><strong>My Unpaid Rentals:</strong> There are no unpaid rentals</h2>}
            <br/>
            {!loading ? (unpaidRentals.length !== 0 ? <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tr>
                        <th>Rental ID</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Total price</th>
                        <th>Actions</th>
                    </tr>
                    {unpaidRentals.map(rental => (
                        <tr key={rental.id}>
                            <td>{rental.id}</td>
                            <td>{rental.rental_start}</td>
                            <td>{rental.rental_end}</td>
                            <td>{rental.car.brand}</td>
                            <td>{rental.car.model}</td>
                            <td>{rental.total_price} zł</td>
                            <td>
                                <button 
                                    className="button is-primary"  
                                    onClick={() => payForRental(rental.id)}>
                                        Pay
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div> : null) : <h2>Loading...</h2>}
            <br/>
            {activeRentals.length !== 0 ? <h2 style={{fontWeight: 'bold'}}>My Active Rentals:</h2> : <h2><strong>My Active Rentals:</strong> There are no active rentals</h2>}
            <br/>
            {!loading ? (activeRentals.length !== 0 ? <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tr>
                        <th>Rental ID</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Total price</th>
                        <th>Actions</th>
                    </tr>
                    {activeRentals.map(rental => (
                        <tr key={rental.id}>
                            <td>{rental.id}</td>
                            <td>{rental.rental_start}</td>
                            <td>{rental.rental_end}</td>
                            <td>{rental.car.brand}</td>
                            <td>{rental.car.model}</td>
                            <td>{rental.total_price} zł</td>
                            <td>
                                <button 
                                    className="button is-danger" 
                                    onClick={() => stopRental(rental.id)}>
                                        Stop Rental
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div> : null) : <h2>Loading...</h2>}
        </div>
    );
};

export default UserProfile;