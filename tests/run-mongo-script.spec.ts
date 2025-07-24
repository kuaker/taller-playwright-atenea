import { test, expect } from '@playwright/test';
import { connectToMongo, closeMongoConnection } from '../utils/mongo-utils';

test('TC1 - Consultar usuario', async () => {
    const db = await connectToMongo();
    const users = db.collection('users');
    const user = await users.findOne({ email: 'arroupe09@gmail.com' });

    expect(user).toBeTruthy();
    expect(user?.firstName).toBe('Fernando');
    await closeMongoConnection();
});


