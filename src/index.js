const express =require ('express');

const app = express ();
const apiRoutes = require('./routes/index');
const bodyParser= require('body-parser');
const {PORT} =require('./config/serverConfig');
const bcrypt = require('bcrypt');
const {User} = require('./models/index');
const prepareAndStartServer = () =>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use('/api',apiRoutes);
 
  app.listen(PORT,async () => {
    console.log(`server started at ${PORT}`);
    const incomingpassword = 'mochiio';
    const user = await User.findByPk(5)
    const response = bcrypt.compareSync(incomingpassword,user.password); 
    console.log(response);
  });
}
prepareAndStartServer();