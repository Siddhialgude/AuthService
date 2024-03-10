const express =require ('express');

const app = express ();
const apiRoutes = require('./routes/index');

const bodyParser= require('body-parser');
const {PORT} =require('./config/serverConfig');

// const bcrypt = require('bcrypt');
// const {User} = require('./models/index');
// const UserRepository = require('./repository/user-repository');
 
const prepareAndStartServer = () =>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use('/api',apiRoutes);
 
  app.listen(PORT,async () => {
    console.log(`server started at ${PORT}`);

    // const repo = new UserRepository();
    // const response = await repo.getById(2);
    // console.log(response);
    // //const incomingpassword = 'mochii';
    // const user = await User.findByPk(5)
    // const response = bcrypt.compareSync(incomingpassword,user.password); 
    // console.log(response);
  });
}
prepareAndStartServer();