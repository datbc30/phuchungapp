import React from 'react'

export default function Login() {
  return (
    <div className='container__login'>
        <div className='screen'>
            <div className='screen__content'>
                <form action="" className='login' method='post'>
                    <div className='login__field'>
                        <i className='login__icon fas fa-user'></i>
                        <input type="text" name='usename' placeholder='Usename / Email' className='login__input' />
                    </div>
                    <div className='login__field'>
                        <i className='login__icon fas fa-lock'></i>
                        <input type="text" name="password" id="password" placeholder='Passwword' className='login__input' />
                    </div>
                    <button className='button login__submit' type='submit'>
                        <span className='button__text'>Login now</span>
                    </button>
                </form>
            </div>
            <div className='screen__background'>
                <span className='screen__background__shape screen__background__shape4'></span>
                <span className='screen__background__shape screen__background__shape3'></span>
                <span className='screen__background__shape screen__background__shape2'></span>
                <span className='screen__background__shape screen__background__shape1'></span>
            </div>
        </div>
    </div>
  )
}
