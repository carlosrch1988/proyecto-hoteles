const sqlite3 = require('db');
let db = null;

const initDB = () => {
  return new Promise ( (accept, reject) => {
    let database = new sqlite3.Database(
      `./data/${process.env.DB_FILENAME}.db`,
      (err) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        accept(database);
      }
    );
  } );
}

const singletonGetDB = async () => {
  if (!db) {
    db = await initDB();
  }
  return db;
}
// Academic
const singletonGetDBnoPromise = () => {
  if (!db) {
    initDB()
      .then( (database) => { db = database; } )
      .catch( (err)=> { throw Error('Error de Database') });
  }
  return db;
}

module.exports = singletonGetDB;
