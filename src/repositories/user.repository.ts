import { Database } from '../database/config/database.connection';
import { UserEntity } from '../database/entities/user.entity';
import { User } from '../models/user.model';

export class UserRepository {
  private repository = Database.connection.getRepository(UserEntity);

  public async list() {
    const result = await this.repository.find({
      relations: {
        recados: true,
      },
    });

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

  public static mapRowToModel(row: UserEntity): User {
    return User.create(row);
  }
}
