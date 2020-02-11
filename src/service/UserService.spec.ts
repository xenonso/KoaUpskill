import * as sinon from 'sinon';
import { UserService } from './UserService';
import { UserRepository } from '../repository/UserRepository';
import * as assert from 'assert';
import { User } from '../entity/User';
import { UserRole } from '../enum/UserRole';

describe('Users service', () => {
    it('getAllUsers()', async () => {
        const userRepository: UserRepository = new UserRepository();
        const userService: UserService = new UserService(userRepository);

        sinon.stub(userRepository, 'find' as any).resolves(getMultipleUsers());

        assert.deepEqual(await userService.getAllUsers(), getMultipleUsers());
    });

    it('getAllUsers() empty', async () => {
        const userRepository: UserRepository = new UserRepository();
        const userService: UserService = new UserService(userRepository);

        sinon.stub(userRepository, 'find' as any).resolves([]);

        assert.deepEqual(await userService.getAllUsers(), []);
    });

    it('findOneUser()', async () => {
        const userRepository: UserRepository = new UserRepository();
        const userService: UserService = new UserService(userRepository);

        sinon.stub(userRepository, 'findOne' as any).resolves(getUser());

        assert.deepEqual(await userService.findOneUser('Som3ID'), getUser());
    });
});

function getMultipleUsers(): User[] {
    return [getUser(), getUser()];
}

function getUser(): User {
    const user = new User();
    user.firstName = 'John';
    user.lastName = 'Doe';
    user.role = UserRole.ADMIN;

    return user;
}
