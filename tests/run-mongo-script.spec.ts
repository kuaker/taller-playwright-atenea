import { test, expect } from '@playwright/test';
import { connectToMongo, closeMongoConnection } from '../utils/mongo-utils';

test.describe('MongoDB Tests', () => {
    let db;

    test.beforeAll(async () => {
        db = await connectToMongo();
        expect(db).toBeTruthy();
        console.log('*** Conexión a MongoDB exitosa ***');
    })

    test.afterAll(async () => {
        await closeMongoConnection();
        console.log('*** Conexión a MongoDB cerrada***');
    });

    test('TC1 - Consultar usuario', async () => {

        const users = db.collection('users');
        const user = await users.findOne({ email: 'arroupe09@gmail.com' });

        expect(user).toBeTruthy();
        expect(user?.firstName).toBe('Fernando');
    });

    test('TC2 - Borrar usuarios', async () => {

        const users = db.collection('users');
        await users.deleteMany({
            email: { $regex: 'farroupe', $options: 'i' }
        });

        console.log('Usuarios borrados');
    });

})