var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var subCategoriesSchema, subCategoriesModel; 

try {
    subCategoriesSchema = new mongoose.Schema ({
        catRefId: { 
            type: mongoose.Types.ObjectId, 
            unique : true, 
            required : true 
        },        
        name: { 
            type: String, 
            unique : true, 
            required : true 
        },
        description: { 
            type: String, 
            unique : true, 
            required : false 
        }
    });

    subCategoriesSchema.plugin(uniqueValidator, 'Error, expected {PATH} to be unique.');  
    subCategoriesModel = mongoose.model('subCategories', subCategoriesSchema);
}

catch (e) { console.log (e) }

module.exports.subCategoriesModel = subCategoriesModel;
