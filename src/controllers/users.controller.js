import UserDao from "../daos/mongoDB/users.dao.js";
const userDao = new UserDao();
import UserServices from "../services/user.services.js";
const userService = new UserServices();

export default class UserController {
  async registerResponse(req, res, next) {
    try {
      res.json({
        msg: "register ok!",
        session: req.session
      });
    } catch (error) {
      next(error.message);  
    }
  }


async loginResponse(req, res, next) {
    try {
      const id = req.session.passport.user;
      const user = await userDao.getById(id);
      const { first_name, last_name } = user;
      res.json({
        msg: "login ok!",
        user: {
          first_name, last_name
        }
      });
    } catch (error) {
      next(error.message);
    }
  }
  
  
 
  async register(req, res, next) {
    console.log("clg desde el REGISTER del user.cotroller", req.body);
    try {
      const user = await userService.register(req.body);
      if (user) res.redirect("/login");
      else res.redirect("/register-error");
    } catch (error) {
      next(error);  
    }
  }

  
async login(req, res, next) {
    try {
        const { email } = req.body;
      const user = await userService.login(req.body);
      console.log("clg desde el LOGIN del user.cotroller", user);
      if(user) {
            req.session.email = email;
            res.redirect('/profile');
        } else res.redirect('/error-login')
    } catch (error) {
        console.log(error);
    }
}

}