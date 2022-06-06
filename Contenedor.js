const { constants } = require('buffer');
const fs = require('fs');
const fsPromises = fs.promises;

class Contenedor {
    constructor(fileName) {
        this.filePath = `./${fileName}.txt`;
    }

    // Guarda un nuevo objeto en el array y le asigna un nuevo Id
    async save(obj) {
        try {
            const items = await this.getAll();

            let newId = 0;
            if(items.length) {
                newId = items[items.length - 1].id + 1;
            }
            const newItem = {...obj, id: newId};
            items.push(newItem);

            await fsPromises.writeFile(this.filePath, JSON.stringify(items, null, 2));
            return newId;
        } catch(err) {
            console.log('No se pudo guardar el objeto', err);
        }
    }

    async getById(id) {
        try {
            const items = await this.getAll();
            const foundItem = items.find(el => el.id === id);
            if (!foundItem) return null;
            return foundItem;
        } catch(err) {
            console.log('error al obtener el item', err);
        }
    }

    async getAll() {
        try {
            const items = JSON.parse(await fsPromises.readFile(this.filePath));
            return items;
        } catch(err) {
            console.log('No se puedo leer el archivo', err);
        }
    }

    async deleteById(id) {
        try {
            const items = await this.getAll();
            const arrayIndex = items.findIndex(el => el.id === id);
            if(arrayIndex === -1) {
                console.log(`El archivo con id:${id} no existe`);
                return null;
            }
            items.splice(arrayIndex, 1);
            await fsPromises.writeFile(this.filePath, JSON.stringify(items, null, 2));
        } catch(err) {
            console.log('No se pudo eliminar el item', err);
        }
    }

    async deleteAll() {
        try {
            await fsPromises.writeFile(this.filePath, JSON.stringify([]));
            console.log('Se elminaron todos los elementos');
        } catch (err) {
            console.log('Hubo un error', err);
        }
    }
}

module.exports = Contenedor;