const { buscarTodos, buscarUm } = require('../controllers/CarroController');
const db = require('../db');

module.exports = {
    buscarTodos : () => {
        return new Promise((aceito, rejeitado) => {
        
            db.query('SELECT * FROM carros', (Error, results) =>{
                if (Error){ rejeitado(Error); return;}
                aceito(results);
            });
        });
    },
    buscarUm: (codigo) =>{
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM carros WHERE codigo = ?', [codigo], (Error, results) => {
                if (Error) { rejeitado(Error); return;}
                if (results.length > 0){
                    aceito(results[0]);
                }
                else {
                    aceito(false);
                }
            });
            
        });
    },
    inserir: (modelo, placa) =>{
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO carros (modelo, placa) VALUES(?,?',
                [modelo, placa],
                (Error, results) => {
                    if (Error) { rejeitado(Error); return;}
                    aceito(results.insertCodigo);
                }
            );
            
        });
    },

    alterar: (codigo,modelo, placa) =>{
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE carros SET modelo = ?, placa = ? WHERE codigo = ?',
                [modelo, placa, codigo],
                (Error, results) => {
                    if (Error) { rejeitado(Error); return;}
                    aceito(results);
                }
            );
            
        });
    },

    exluir : (codigo) => {
        return new Promise((aceito, rejeitado) => {
        
            db.query('DELETE FROM carros WHERE codigo = ?',[codigo],(Error, results) =>{
                if (Error){ rejeitado(Error); return;}
                aceito(results);
            });
        });

    }

};