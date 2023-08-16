import { Server } from './main/config/express.config';
import { Database } from './main/database/database.connection';
import 'reflect-metadata';
import { CacheDatabase } from './main/database/redis.connection';

Promise.all([Database.connect(), CacheDatabase.connect()]).then(() => {
  const app = Server.create();
  Server.listen(app);
});
