const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');

class UserService{
  constructor(){
    this.userRepository = new UserRepository();
  }

  async create(data){
    try{
      const user = await this.userRepository.create(data);
      return user;
    }catch(error){
      console.log("something went wrong in the service layer");
      throw error;
    }
  }
  async signIn(email,plainPassword){
    try{
      //create user using email
      const user = await this.userRepository.getByEmail(email);
      //compare passwords
      const passwordMatch =this.checkPassword(plainPassword,user.password);
      if(!passwordMatch){
        console.log('Password doesnt match');
        throw{
          error:'incorrecct password'
        };
      }
      //compare passwords match then create token and send it to user
      const newJWT = this.createToken({email:user.email,id:user.id});
      return newJWT;

      return user;

    }catch(error){
      console.log('something went wrong in signin process');
      throw error;
    }
  }
  async isAuthenticated(token){
    try{
      const response= this.verifyToken(token);
      if(!response)
      {
        throw  { error:'Invalid token'}
      }
      const user = await this.userRepository.getById(response.id);
      if(!user){
        throw {error:'no user with the corresponding token exists'};
      }
      return user.id;

    }catch(error){
      console.log('something went wrong in token creation');
      throw error;
    }
  }
  createToken(user) {
    try{
      const result = jwt.sign( 
        user,JWT_KEY,
      {expiresIn:'3d'});
      return result;

    }catch(error){
      console.log('something went wrong in token creation');
      throw error;
    }
  }

  verifyToken(token){
    try{
      const response = jwt.verify(token,JWT_KEY);
      return response;

    }catch(error){
      console.log('something went wrong at services');
      throw error;
    }
  }

  checkPassword(userInputPlainPassword,encryptedPassword){
    try{
      return bcrypt.compareSync(userInputPlainPassword ,encryptedPassword);
    }
    catch(error){
      console.log('something went wrong in service layer');
      throw error;
    }
  }
}

module.exports=UserService;