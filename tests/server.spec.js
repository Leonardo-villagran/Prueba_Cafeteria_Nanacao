const request = require('supertest');
const server = require('../index'); 

describe('Pruebas de la API de la Cafetería Nanacao', () => {

    // Prueba 1: GET /cafes debe devolver un arreglo con al menos un objeto
    it('GET /cafes devuelve un status code 200 y un arreglo con al menos un objeto', async () => {
        const response = await request(server).get('/cafes').send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Prueba 2: DELETE /cafes/:id Intentar eliminar un café con un ID inexistente debe devolver un código 404
    it('DELETE /cafes/:id al eliminar un café con un ID inexistente devuelve un código 404', async () => {

        const jwt = "token";
        const idInexistente = '5';
        const response = await request(server).delete(`/cafes/${idInexistente}`).set('Authorization', jwt).send();
        expect(response.statusCode).toBe(404);
    });

    // Prueba 3: POST /cafes debe agregar un nuevo café y devolver un código 201
    it('POST /cafes agrega un nuevo café y devuelve un código 201', async () => {

        const nuevoCafe = { id:5, nombre: 'Café de prueba'};
        const response = await request(server).post('/cafes').send(nuevoCafe);
        expect(response.body).toContainEqual(nuevoCafe);
        expect(response.statusCode).toBe(201);
    });

    // Prueba 4: PUT /cafes/:id debe devolver un status code 400 si se intenta actualizar un café con un ID diferente al del payload
    it('PUT /cafes/:id devuelve un status code 400 si se intenta actualizar un café con un ID diferente al del payload', async () => {

        const idExistente = '4';
        const payload = { id: '5', nombre: 'Café actualizado'};
        const response = await request(server).put(`/cafes/${idExistente}`).send(payload);
        expect(response.statusCode).toBe(400);
    });
});