const supertest = require('supertest')
const app = require('../index')
const sequelize  = require('../jest.setup')
const request = supertest(app)


beforeAll(async () => {
    // Synchroniser la base de données de test avant que les tests ne soient exécutés
    await sequelize.sync({ force: true });
  });

describe("api auth", () => {
    
    test('api signup', async () => {
       const res = await  request.post('/api/auth/signup')
                                 .set('Accept', 'application/json')
                                 .send({
                                    username:'fouaddd',
                                    email: "email@test.com",
                                    password: "454545dd"
                                 })
                                 

        expect(res.status).toBe(200)

    })

})

afterAll(async () => {
 
  await sequelize.close();
});