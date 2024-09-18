const pactum = require('pactum');

describe('API Integration Tests for User Endpoints', () => {


    // Test for DELETE /api/user/:id
    it('should delete a user with DELETE /api/user/:id', async () => {
        await pactum.spec()
            .delete('http://localhost:3000/api/user/1')
            .expectStatus(200)
            .expectJson({
                message: 'User deleted successfully'
            });
    });

    // Test for GET user by ID
    it('should return user details for GET /api/user/:id', async () => {
        await pactum.spec()
            .get('http://localhost:3000/api/user/1')
            .expectStatus(200)
            .expectJson({
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com'
            });
    });

    // Test for POST /api/user (creating a new user)
    it('should create a new user with POST /api/user', async () => {
        await pactum.spec()
            .post('http://localhost:3000/api/user')
            .withJson({
                name: 'New User',
                email: 'new.user@example.com'
            })
            .expectStatus(201)
            .expectJson({
                message: 'User created successfully',
                user: {
                    name: 'New User',
                    email: 'new.user@example.com'
                }
            });
    });

    // Test for PUT /api/user/:id (full update)
    it('should update a user with PUT /api/user/:id', async () => {
        await pactum.spec()
            .put('http://localhost:3000/api/user/1')
            .withJson({
                name: 'Updated Name',
                email: 'updated.email@example.com'
            })
            .expectStatus(200)
            .expectJson({
                message: 'User updated successfully',
                user: {
                    id: 1,
                    name: 'Updated Name',
                    email: 'updated.email@example.com'
                }
            });
    });

    // Test for PATCH /api/user/:id (partial update)
    it('should partially update a user with PATCH /api/user/:id', async () => {
        await pactum.spec()
            .patch('http://localhost:3000/api/user/1')
            .withJson({
                email: 'patched.email@example.com'
            })
            .expectStatus(200)
            .expectJson({
                message: 'User partially updated successfully',
                user: {
                    id: 1,
                    name: 'Updated Name',  // Should retain the original name from PUT test
                    email: 'patched.email@example.com'
                }
            });
    });

    // Test for GET /api/user/:id - 404 Not Found after deletion
    it('should return 404 for GET /api/user/:id after deletion', async () => {
        await pactum.spec()
            .get('http://localhost:3000/api/user/1')
            .expectStatus(404)
            .expectJson({ error: 'User not found' });
    });

});
