import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { Destination } from '../components';
import { getCities } from '../actions';

function DestinationContainer() {
    const { destination } = useParams();
    console.log(destination);
    const cities = useSelector(state => state.cities);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCities());
    }, [])

    const filterCities = cities.filter(city => city.destination === destination);

    return (
        <Destination>
            <Destination.Title>Next trips to: <span>{destination}</span></Destination.Title>
            <Destination.Base>     
                {filterCities.map(city => {
                    const date = new Date(city.departureTime);
                    const options = {weekday: 'long'}
                    const getDayName = date.toLocaleDateString('en-US', options);
                    const getFullDate = date.toLocaleDateString();
                    const getTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

                    const availableSeates = city.seats.reduce((a, b) => b.isAvailable ? ++a : a, 0);

                    return (
                        <Destination.Frame key={city.id}>
                            <Destination.Group>
                                <Destination.Day>{getDayName}</Destination.Day>
                                <Destination.Time>{getTime}</Destination.Time>
                            </Destination.Group>
                            <Destination.Group>    
                                <Destination.Date>{getFullDate}</Destination.Date>
                                <Destination.Seats><span>{availableSeates}</span> seats lefts</Destination.Seats>
                            </Destination.Group>
                            
                            <Destination.Link to={`/trip/${city.id}`}>
                                <Destination.Book type="button">Book a place</Destination.Book>
                            </Destination.Link>
                        </Destination.Frame>
                    )
                    
                })}
            </Destination.Base>
        </Destination>
    )
}

export default DestinationContainer;
