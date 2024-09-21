const pactum = require('pactum');
const { connect, disconnect } = require('mongoose');
pactum.settings.setLogLevel('DEBUG');

const userEmail = 'jarinsama1@gmail.com';
const userName = 'Jarin Sultana';
describe('API Integration Tests for User Endpoints', () => {
    before(async () => {
        await connect('mongodb://localhost:27017/usersdb');
    });

    it('should create a new user with POST /api/user', async () => {
        await pactum.spec()
            .post('http://localhost:3000/api/user')
            .withJson({ name: userName, email: userEmail })
            .expectStatus(201)
            .expectJsonLike({
                message: 'User created successfully',
                user: { name: userName }
            });
    });

    it('should update user details with PUT /api/user/:email', async () => {
        await pactum.spec()
            .put(`http://localhost:3000/api/user/${userEmail}`)
            .withJson({
                name: 'Updated User',
                email: 'updated.user@example.com'
            })
            .expectStatus(200)
            .expectJsonLike({
                message: 'User updated successfully',
                user: { name: 'Updated User', email: 'updated.user@example.com' }
            });
    });

    it('should delete a user with DELETE /api/user/:email', async () => {
        await pactum.spec()
            .delete(`http://localhost:3000/api/user/${'updated.user@example.com'}`)
            .expectStatus(200)
            .expectJson({ message: 'User deleted successfully' });
    });

    it('should return 404 for GET /api/user/:email after deletion', async () => {
        await pactum.spec()
            .get(`http://localhost:3000/api/user/${'updated.user@example.com'}`)
            .expectStatus(404)
            .expectJson({ error: 'User not found' });
    });

    after(async () => {
        await disconnect();
    });
});

