import React, { useState } from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { useSignIn } from 'react-auth-kit';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://tryade-site-web-server.vercel.app/admins', formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (
            signIn({
              token: res.data.token,
              expiresIn: res.data.expiresIn,
              tokenType: 'Bearer',
              authState: res.data.authUserState,
              // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
              // refreshTokenExpireIn: res.data.refreshTokenExpireIn, // Only if you are using refreshToken feature
            })
          ) {
            // Redirect if sign-in is successful
            navigate('/panel');
          } else {
            // Throw an error or handle unsuccessful sign-in
            throw new Error('Sign-in unsuccessful'); // Simulate an error
          }
        } else {
          // Throw an error if the response status is not 200
          throw new Error('API call unsuccessful');
        }
      })
      .catch((error) => {
        // Handle API errors here
        console.error('Error during API call', error);
      });
  };
  return (
    <>
      <div className='imageBackground homeBackground' />
      <div className='page loginPage'>
        <Title
          mainTitle='Panel Gestion'
          shadowTitle='ADMINISTRATION'
          big
        />

        <form
          className='loginForm'
          onSubmit={onSubmit}>
          <label
            htmlFor='username'
            className='label loginFormĹabelUserName'>
            Nom d’utilisateur
          </label>
          <input
            className='input'
            type='text'
            id='username'
            name='username'
            placeholder="Entrez votre nom d'utilisateur"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
          />

          <label
            htmlFor='password'
            className='label loginFormLabelPassword'>
            Mot de passe
          </label>
          <input
            className='input'
            type='password'
            id='password'
            name='password'
            placeholder='Entrez votre mot de passe'
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
          <Button
            title='CONNEXION'
            type='submit'
            onClick={() => true}
          />
        </form>
      </div>
    </>
  );
};

export default LoginPage;
