const getDb = require('../db');
let db = null;
class hoteles {

    constructor() {
        getDb()
            .then((database) =>  {
                db = database;
                if (process.env.MIGRATE === 'true') {
                    const createStatement = 'CREATE TABLE IF NOT EXISTS CREATE TABLE "hoteles" ("id" INTEGER, "nombre" TEXT, "telefono"	TEXT, "url"	TEXT, "ubicacion" TEXT, PRIMARY KEY("id" AUTOINCREMENT))';
                    db.run(createStatement);
                }
            })
            .catch((err) =>  { console.error(err) });
    }

    new(nombre, telefono, url, ubicacion) {
        return new Promise((accept, reject) => {
            db.run(
                'INSERT INTO pacientes (nombre, telefono, url, ubicacion) VALUES (?, ?, ?, ?);', [nombre, telefono, url, ubicacion],
                (err, rslt) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    accept(rslt);
                }
            );
        });
    }

    getAll() {
        return new Promise((accept, reject) => {
            db.all('SELECT * from hoteles;', (err, rows) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    accept(rows);
                }
            });
        });
    }

    getById(id) {
        return new Promise((accept, reject) => {
            db.get(
                'SELECT * from hoteles where id=?;', [id],
                (err, row) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        accept(row);
                    }
                });
        });
    }

    updateOne(id, nombre, telefono, telefono, url, ubicacion) {
        return new Promise(
            (accept, reject) => {
                const sqlUpdate = 'UPDATE hoteles set nombre = ?, telefono = ?, url = ?, ubicacion = ? where id = ?;';
                db.run(
                    sqlUpdate, [nombre, telefono, telefono, url, ubicacion, id],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            accept(this);
                        }
                    }
                );
            }
        );
    }

    deleteOne(id) {
        return new Promise(
            (accept, reject) => {
                const sqlDelete = 'DELETE FROM hoteles where id = ?;';
                db.run(
                    sqlDelete, [id],
                    function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            accept(this);
                        }
                    }
                );
            }
        );
    }

}

module.exports = hoteles;
