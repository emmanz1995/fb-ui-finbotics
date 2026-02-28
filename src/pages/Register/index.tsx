import { supabaseClient } from "../../lib";

import Button from "../../components/atoms/button";
import Input from "../../components/atoms/input";

const Register = () => {
  return (
    <div>
      <div>
        <form>
          <h2>Register</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <Input placeholder="John.Doe@eyefind.com" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Input placeholder="******************" />
          </div>
          <div>
            <Button fullWidth="full" variant="primary">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );;
};

export default Register;
