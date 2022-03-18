const mongoose = require("mongoose");
const PetModel = mongoose.model("Pet");


exports.insertNewPet = async (request, response) => {
  const { userDetails } = request;
  const PetDetails = request.body;

      try {
        const newPet = new PetModel();
        newPet.id = Date.now();
        newPet.category.id = PetDetails.category.id;
        newPet.category.name = PetDetails.category.name;
        newPet.name = PetDetails.name;
        try
        {
          PetDetails.photoUrls.forEach(element => {
            newPet.photoUrls.push(element);
          });
        }
        catch(error)
        { 
          response.status(400).send({error:"photoUrls is missing"});
          return;
        }    
      
      try{
            PetDetails.tags.forEach(element => {
            newPet.tags.push(element);
          });
        }
        catch(error)
        { 
          response.status(400).send({error:"Tag is missing"});
          return;
        } 
        if(PetDetails.status!=undefined)
          newPet.status = PetDetails.status;
  
          newPet.save(function(err,docs){
          if(err)
          {
            response.status(400).json({
              Message: "Pet not Registerd",
              error : {
                error_type : err.errors,
                message : err.message,
              }
            });
          }
          else
          {
            const petList = [];

            docs.tags.forEach(element => {
              petList.push({
                id:element.id,
                name:element.name,
              })
            });

            const data = {
              id : docs.id,
              category : {
                id : docs.category.id,
                name : docs.category.name,
              },
              name:docs.name,
              photoUrls : docs.photoUrls,
              status : docs.status,
              tags : petList,
            }

            response.status(200).json({
              Message: "Pet Registerd",
              data:data
            });    
          }
        });
      } 
      catch (err) {
        response.status(400).send({
          Message: "Pet Not Registerd",
        }); 
      }
};

exports.updatePet = async (request, response) => {
  const petId = request.params.id;
  const PetDetails = request.body;
  PetDetails.id=petId;
  console.log(petId);

  PetModel.updateOne({'id': petId},PetDetails,(error, document) => {
      if (error)
      response.status(500).json({
        Message: "Error Occureed while updating pet details",
        error : { 
          error_type : error,
          message : error.message,
        }
      });
     else if (document) {
        response.status(200).json({
          Message: "Pet Updated Successfully",
          data:document
        });
      }
      else{
        response.status(500).send({error:"Pet not found with id : " + petId});
      }
    });
};

exports.deletePet = async (request, response) => {
  const petId = request.params.id;
  PetModel.deleteOne({'id': petId},(error, document) => {
      if (error)
      response.status(500).json({
        Message: "Error Occureed while deleting pet details",
        error : { 
          error_type : error,
          message : error.message,
        }
      });

     else if (document) {
        response.status(200).json({
          Message: "Pet Deleted Successfully",
          data:document
        });
      }
      else{
        response.status(400).send({error:"Pet not found with id : " + petId});
      }
    });
};

exports.getPet = async (request, response) => {
  const petId = request.params.id;
  PetModel.findOne({'id':petId},(error, docs) => {
      if (error)
        { response.status(404).json({
        Message: "Error Occureed while reading pet details",
        error : { 
          error_type : error,
          message : error.message,
        }
      });
    }
      else if (docs) {
        const petList = [];

        docs.tags.forEach(element => {
          petList.push({
            id:element.id,
            name:element.name,
          })
        });

        const data = {
          id : docs.id,
          category : {
            id : docs.category.id,
            name : docs.category.name,
          },
          name:docs.name,
          photoUrls : docs.photoUrls,
          status : docs.status,
          tags : petList,
        }
        response.status(200).json(data);
        // {
        //   Message: "Success",
        //   data:data
        // });
      }
      else{
        response.status(404).send({Message: "Pet not found with id : "+petId});
      }
    });  
};




redPetDetails = async (petId) => {
  PetModel.findOne({'id':petId},(error, document) => {
      if (error)
        {
          return {
        Message: "Error Occureed while reading pet details",
        error : { 
          error_type : error,
          message : error.message,
        }
      };
    }
      else if (document) {
        return document;
      }
      else{
        return {error:"not able to to fetch data with id "+petId}
      }
    });

  
};









exports.getAllPet = async (request, response) => {
 
  PetModel.deletePet((error, document) => {
    if (error)
      response.status(500).json({
      Message: "Error Occureed while reading Pet List",
      error : { 
        error_type : err,
        message : err.message,
      }
    });
    if (document) {
      response.status(200).json(document);
    }

  });
};

exports.deleteAllPet = async (request, response) => {
  try
  {
    PetModel.deleteMany({},(error, document) => {
      if (error)
        { response.status(404).json({
        Message: "Error Occureed while delete all pets",
        error : { 
          error_type : error,
          message : error.message,
        }
      });
    }
      else if (document) {
        response.status(200).json({
          Message:"All Pet details deleted Successfully",
          data:document
        });
      }
      else{
        response.status(404).send({Message: "Pet not found with id : "+petId});
      }
    });
  }
    catch(error)
  {
    response.status(500).json({ error: "Not able delete all pets"});
  }

};



