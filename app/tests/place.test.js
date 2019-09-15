const axios = require('axios');

let queryURL = 'http://localhost:3000/graphql'; 
let server; 
let place_id;
let reservation_id;

beforeAll(() => {
    server = require('../../index');
});

afterAll(() => {
    server.close();
});

describe('Add Place GraphQL APIs', () => {

    it('Adds a new place without reservations', async () => {
        const response = await axios.post(queryURL, {
           query: `mutation {
            addPlace(place_type: "Apartment", host_id: 25, country_code: 435, max_guests:1, no_of_bedrooms: 2, no_of_bathrooms: 1, price_per_day: 3500, address: "Random address") {
              id
              place_type
              host_id
              country_code
              max_guests
              no_of_bedrooms
              no_of_bathrooms
              price_per_day
              address
            }
          }`
        });

        expect(response.status).toBe(200);
        
        const { data } = response.data;
        place_id = data.addPlace.id;
        expect(data.addPlace.place_type).toBe('Apartment');
        expect(data.addPlace.host_id).toBe('25');
        expect(data.addPlace.country_code).toBe(435);
        expect(data.addPlace.no_of_bedrooms).toBe(2);
        expect(data.addPlace.no_of_bathrooms).toBe(1);
        expect(data.addPlace.price_per_day).toBe(3500);
        expect(data.addPlace.address).toBe('Random address');
    });

    it ('Adds a reservation for a place', async () => {
        const response = await axios.post(queryURL, {
            query: `mutation {
                addReservation(place_id: "${place_id}", user_id: 123, start_date: "2019-08-12", end_date: "2019-08-14") {
                  reservations{
                    id
                    user_id
                    start_date
                    end_date
                  }
                }
            }`
        });

        expect(response.status).toBe(200);
        
        const { data } = response.data;
        reservation_id = data.addReservation.reservations[0].id;
        expect(data.addReservation.reservations[0].user_id).toBe('123');
        expect(data.addReservation.reservations[0].start_date).toBe(String(new Date("2019-08-12").getTime()));
        expect(data.addReservation.reservations[0].end_date).toBe(String(new Date("2019-08-14").getTime()));
    });
});

describe('Get Place GraphQL APIs', () => {

    it('Return a place for a given place id', async () => {
        const response = await axios.post(queryURL, {
            query: `query {
                getPlaceById(id: "${place_id}") {
                  id
                  place_type
                  host_id
                  country_code
                  max_guests
                  no_of_bedrooms
                  no_of_bathrooms
                  address
                  price_per_day
                }
            }`
        });

        expect(response.status).toBe(200);

        const { data } = response.data;
        expect(data.getPlaceById.id).toBe(`${place_id}`);
        expect(data.getPlaceById.place_type).toBe('Apartment');
        expect(data.getPlaceById.host_id).toBe('25');
        expect(data.getPlaceById.country_code).toBe(435);
        expect(data.getPlaceById.no_of_bedrooms).toBe(2);
        expect(data.getPlaceById.no_of_bathrooms).toBe(1);
        expect(data.getPlaceById.price_per_day).toBe(3500);
        expect(data.getPlaceById.address).toBe('Random address');
    });

    it ('Return all reservations for a place Id in the expected format', async () => {
        const response = await axios.post(queryURL, {
            query: `query {
                    getReservationsByPlaceId(id: "${place_id}") {
                        id
                        user_id
                        start_date
                        end_date
                    }
               }`
        });

        expect(response.status).toBe(200);

        const { data } = response.data;
        expect(data.getReservationsByPlaceId[0].id).toBe(`${reservation_id}`);
        expect(data.getReservationsByPlaceId[0].user_id).toBe('123');
        expect(data.getReservationsByPlaceId[0].start_date).toBe(String(new Date("2019-08-12").getTime()));
        expect(data.getReservationsByPlaceId[0].end_date).toBe(String(new Date("2019-08-14").getTime()));
    });
});

describe('Update Place GraphQL APIs', () => {

    it('Updates a place by id for a given Place id', async () => {
        const response = await axios.post(queryURL, {
            query: `mutation {
                updatePlace(place_id: "${place_id}", place_type: "House", country_code: 400, price_per_day: 4000, address: "New Address") {
                  id
                  place_type
                  country_code
                  price_per_day
                  address
                }
              }`
        }); 

        expect(response.status).toBe(200);

        const { data } = response.data;
        expect(data.updatePlace.id).toBe(`${place_id}`);
        expect(data.updatePlace.country_code).toBe(400);
        expect(data.updatePlace.price_per_day).toBe(4000);
        expect(data.updatePlace.address).toBe("New Address");
    });
});

describe('Delete Place GraphQL APIs', () => {

    it ('Deletes a reservation by id for a given Place id', async () => {
        const response = await axios.post(queryURL, {
            query: `mutation {
                deleteReservationById(place_id: "${place_id}", reservation_id: "${reservation_id}") {
                  id
                  reservations{
                    id
                  }
                }
            }`
        });

        expect(response.status).toBe(200);

        const { data } = response.data;
        expect(data.deleteReservationById.id).toBe(`${place_id}`);
        expect(data.deleteReservationById.reservations[0].id).toBe(`${reservation_id}`);
    });

    it('Deletes a place by id', async () => {
        const response = await axios.post(queryURL, {
            query: `mutation {
                deletePlaceById(place_id: "${place_id}") {
                  id
                }
            }`
        });

        expect(response.status).toBe(200);

        const { data } = response.data;
        expect(data.deletePlaceById.id).toBe(`${place_id}`);
    });
});

