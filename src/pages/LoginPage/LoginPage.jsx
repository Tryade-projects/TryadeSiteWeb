import React from 'react';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';

const LoginPage = () => {
  return (
    <>
      <div className='imageBackground homeBackground' />
      <div className='page loginPage'>
        <Title
          mainTitle='Panel Gestion'
          shadowTitle='ADMINISTRATION'
          big
        />

        <form className='loginForm'>
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
          />
          <Button title='CONNEXION' />
        </form>
      </div>
    </>
  );
};

export default LoginPage;
