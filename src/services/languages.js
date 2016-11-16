var LanguageDao = require('../daos/languages');

/**
 * Language Service (Middleware)
 *
 */
module.exports = class LanguageService {
    static creatableProperties = [
        'name',
        'englishName'
    ];
    static propertiesRequiredToCreate = [
        'name',
        'englishName'
    ];
    static updatableProperties = [
        'name',
        'englishName'
    ];
    static propertiesRequiredToUpdate = [
    ];

    static getAll(limit, skip) {
        return new Promise((resolve, reject) => {
            //get all languages
            LanguageDao.getAll(limit, skip).then((languages) => {
                resolve(languages);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static getById(id, limit, skip) {
        return new Promise((resolve, reject) => {
            //get language
            LanguageDao.getById(id, limit, skip).then((language) => {
                resolve(language);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static create(language) {
        return new Promise((resolve, reject) => {
            var whiteListedLanguage = this.createObjectFromWhiteList(language, this.creatableProperties);
            var missingProperty;
            this.propertiesRequiredToCreate.some((property) => {
                if(!whiteListedLanguage[property]){
                    return missingProperty = property;
                }
            });

            if(missingProperty){
                return reject(new Error('Missing Property '+ missingProperty));
            }

            return LanguageDao.create(whiteListedLanguage).then((languages)=> {
                resolve(languages);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static update(id, newLanguage, userId) {
        return new Promise((resolve, reject) => {
            // get language
            LanguageDao.getById(id).then((language) => {
                if (!language) {
                    return reject(new Error('Language not found'));
                }

                var whiteListedLanguage = this.createObjectFromWhiteList(newLanguage, this.updatableProperties);
                var missingProperty;
                this.propertiesRequiredToUpdate.some((property) => {
                    if(!whiteListedLanguage[property]){
                        return missingProperty = property;
                    }
                });

                if(missingProperty){
                    return reject(new Error('Missing Property '+ missingProperty));
                }

                if(!Object.keys(whiteListedLanguage).length){
                    return reject(new Error("Updating with a empty object"));
                }

                //update property
                return LanguageDao.update(id, whiteListedLanguage);
            }).then((languages) => {
                resolve(languages);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static remove(id, userId) {
        return new Promise((resolve, reject) => {
            //get language
            LanguageDao.getById(id).then((language) => {
                if (!language) {
                    return reject(new Error('language not found'));
                }

                //remove language
                return LanguageDao.remove(id);
            }).then((language) => {
                resolve(language);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    static createObjectFromWhiteList(object, whiteList) {
        var whiteListedObject = {};
        for (var property in object) {
            if (object.hasOwnProperty(property) && whiteList.indexOf(property) > -1) {
                whiteListedObject[property] = object[property];
            }
        }

        return whiteListedObject;
    }
};