import React from 'react';
import Input from '../../components/atoms/input';
import Button from '../../components/atoms/button';
import { onLogin } from '../../connector/supabase';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    onLogin({ email, password })
      .then(promise => {
        console.log(promise);
      })
      .catch((err: any) => console.log(err));
  };
  return (
    <div>
      <div>
        <form>
          <h2>Login</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <Input
              type="text"
              placeholder="John.Doe@eyefind.com"
              name="email"
              value={email}
              onChange={(evt: any) => setEmail(evt.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              placeholder="******************"
              name="password"
              value={password}
              onChange={(evt: any) => setPassword(evt.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              fullWidth="full"
              variant="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
