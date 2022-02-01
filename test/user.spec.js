import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import User from '../model/User';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('User app test', async () => {
    after(async () => {
        await User.deleteMany({});
    })
    it('should allow users create account', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                first_name: 'omoalfa', last_name: 'olayinka',
                username: 'Omoola', date_of_birth: '22-03-1991'
            });


        expect(res.status).to.equals(201);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('account created succcessfully')
    })
    it('should not create 2 two account with same username', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                first_name: 'omoalfa', last_name: 'olayinka',
                username: 'Omoola', date_of_birth: '22-03-1991'
            })
        
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(false);
    })
    it('should allow last name be empty', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                first_name: 'Odunayo',
                username: 'Odunmi', date_of_birth: '22-03-1991'
            })
        
        expect(res.status).to.equal(201)
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('account created succcessfully')
    })
    it('should not allow without required field', async () => {
        const res = await request(app)
            .post('/api/user')
            .send({
                username: 'Odunmi', date_of_birth: '22-03-1991'
            })

        expect(res.status).to.equal(401)
    })
    it('should get all users', async () => {
        const res = await request(app)
            .get('/api/user')
        
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('users fetched successfully')
    })
    it('should delete user by username', async () => {
        const res = await request(app)
            .delete('/api/user/omoalfa')

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal(true);
    })
})
