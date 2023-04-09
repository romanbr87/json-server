var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var categoriesSchema, categoriesModel; 

try {
    categoriesSchema = new mongoose.Schema ({
        name: { 
            type: String, 
            unique : true, 
            required : true 
        },
        description: { 
            type: String, 
            unique : true, 
            required : true 
        }
    });

    categoriesSchema.plugin(uniqueValidator, 'Error, expected {PATH} to be unique.');  
    categoriesModel = mongoose.model('categories', categoriesSchema);
}

catch (e) { console.log (e) }

module.exports.categoriesModel = categoriesModel;
