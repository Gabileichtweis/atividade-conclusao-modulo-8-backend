import { usersList } from '../data/users';
import { Database } from '../database/config/database.connection';
import { UserEntity } from '../database/entities/user.entity';
import { User } from '../models/user.model';

export class UserRepository {
  private repository = Database.connection.getRepository(UserEntity);

  public async list() {
    const result = await this.repository.find();

    console.log(result);

    return result.map((entity) => UserRepository.mapRowToModel(entity));
  }

  public async get(email: string) {
    const result = await this.repository.findOneBy({
      email,
    });

    if (!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  public getEmail(email: string) {
    return usersList.find((user) => user.email === email);
  }

  public static mapRowToModel(row: UserEntity): User {
    return User.create(row);
  }
}
