import { test, expect } from '@playwright/test';
import { connectToMongo, closeMongoConnection } from '../utils/mongo-utils';

test.describe('MongoDB Tests', () => {
    let db;

    test.beforeAll(async () => {
        db = await connectToMongo();
    })

    test.afterAll(async () => {
        await closeMongoConnection();
    });

    test('TC1 - Consultar usuario', async () => {

        const users = db.collection('users');
        const user = await users.findOne({ email: 'arroupe09@gmail.com' });

        expect(user).toBeTruthy();
        expect(user?.firstName).toBe('Fernando');
        await closeMongoConnection();
    });

})
