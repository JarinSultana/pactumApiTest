const pactum = require('pactum');
const { connect, disconnect } = require('mongoose');
const { request } = require('pactum');
const { stash, spec } = require('pactum');
const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User');
const connectDB = require('../helper');
pactum.settings.setLogLevel('DEBUG');


request.setBaseUrl("http://localhost:3000"); 




describe('API Functional Test Scripts', () => {

    before(async () => {
        await connectDB();
        await User.deleteMany({});
    });

    const data = [
        {
            "email": "zayeed@gmail.com", 
            "name": "Zayeed"
        },
        {
            "email": "jarin@gmail.com", 
            "name": "Jarin Sultana"
        },
        {
            "email": "John@gmail.com", 
            "name": "John Abraham"
        }
    ];
    
    it('Create new Users', async () => {
        for (const userData of data) {
    
        try {
           
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('User already exists');
            }
    
          
            const response = await pactum.spec()
                .post('/api/user')
                .withJson(userData)
                .expectStatus(201)
                .expectJsonMatch({
                    "message": 'User created successfully',
                    "user": {
                        "name": userData.name 
                    }
                })
                .expectJsonSchema({
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "enum": ["User created successfully"]
                      },
                      "user": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          }
                        },
                        "required": ["name"]
                      }
                    },
                    "required": ["message", "user"]
                  }
                  );
    
            
            const createdUser = await User.findOne({ email: userData.email });
            expect(createdUser).to.not.be.null;
            expect(createdUser.name).to.equal(userData.name); 
        } catch (error) {
            console.error('Error occurred during the test:', error);
            throw error; 
        }
    }
    });

    it('Retrieve Created Users', async () => {
        for (const userData of data) {
            try {
                
                const response = await pactum.spec()
                    .get(`/api/user/${userData.email}`)
                    .expectStatus(200)
                    .expectJsonMatch({
                        email: userData.email,
                        name: userData.name
                    })
                    .expectJsonSchema({
                        "type": "object",
                        "properties": {
                          "email": {
                            "type": "string",
                            "format": "email"
                          },
                          "name": {
                            "type": "string"
                          }
                        },
                        "required": ["email", "name"]
                      }
                      );
    
               
                const retrievedUser = await User.findOne({ email: userData.email });
                expect(retrievedUser).to.not.be.null;
                expect(retrievedUser.email).to.equal(userData.email); 
                expect(retrievedUser.name).to.equal(userData.name); 
    
            } catch (error) {
                console.error('Error occurred while retrieving user:', error);
                throw error; 
            }
        }
    });
    
    it('Update User Name and Email', async () => {
        const updatedData = {
            "email": "updatedEmail@gmail.com", 
            "name": "UpdatedName"
        };
        
        await pactum.spec()
            .put(`/api/user/{email}`)
            .withPathParams('email', 'John@gmail.com') 
            .withJson(updatedData)
            .expectStatus(200)
            .expectJsonLike({
                "message": 'User updated successfully',
                "user": {
                    "name": updatedData.name,
                    "email": updatedData.email 
                }
            })
            .expectJsonSchema({
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "enum": ["User updated successfully"]
                  },
                  "user": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string",
                        "format": "email"
                      }
                    },
                    "required": ["name", "email"]
                  }
                },
                "required": ["message", "user"]
              }
              );
    
     
        const updatedUser = await User.findOne({ email: updatedData.email }); 
        expect(updatedUser).to.not.be.null; 
        expect(updatedUser.name).to.equal(updatedData.name); 
        expect(updatedUser.email).to.equal(updatedData.email);
    });

    it('Update Email Only ', async () => {
        const updatedData = {
            "email": "abc@gmail.com", 
            "name": "Zayeed"
        };
        
        await pactum.spec()
            .patch('/api/user/{email}')
            .withPathParams('email', 'zayeed@gmail.com')  
            .withJson(updatedData)                      
            .expectStatus(200)                          
            .expectJsonLike({
                "message": 'User partially updated successfully',
                "user": {
                    "name": updatedData.name,
                    "email": updatedData.email
                }
            })
            .expectJsonSchema({
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "enum": ["User partially updated successfully"]
                  },
                  "user": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string",
                        "format": "email"
                      }
                    },
                    "required": ["name", "email"]
                  }
                },
                "required": ["message", "user"]
              }
              );

            const updatedUser = await User.findOne({ email: updatedData.email });
            expect(updatedUser).to.not.be.null; 
            expect(updatedUser.name).to.equal(updatedData.name); 
            expect(updatedUser.email).to.equal(updatedData.email);
    });

    it('Delete a User', async () => {
        await pactum.spec()
            .delete('/api/user/{email}')
            .withPathParams('email', 'updatedEmail@gmail.com')
            .expectStatus(200)
            .expectJson({ message: 'User deleted successfully' })
            .expectJsonSchema({
                "type": "object",
                "properties": {
                  "message": {
                    "type": "string",
                    "enum": ["User deleted successfully"]
                  }
                },
                "required": ["message"]
              }
              );

            const deletedUser = await User.findOne({ email: 'updatedEmail@gmail.com' });
            expect(deletedUser).to.be.null; 
    });
    

    after(async () => {
        // await User.deleteMany({});
        await disconnect();
    });

});

