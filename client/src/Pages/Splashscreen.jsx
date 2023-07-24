import React, { useEffect } from 'react'
import '../Styles/splash.css'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'

export default function Splashscreen() {
  const nav = useNavigate();
  useEffect(() => {
    if (Cookies.get('login') !== undefined){
      nav('/app');
    }
  }, []);

  return (
    <div className='splashscreen'>
        <img src="splashscreen.svg" alt="image" />
        <h1>Gets things with ToDo</h1>
        <p>Do you want to get more done in less time? Do you want to stay organized and focused on your goals? Do you want to have fun while doing it? If you answered yes to any of these questions, then you need to try our amazing todo app!</p>
        <Link to='/signin'>
            <button>Get Started</button>
        </Link>
    </div>
  )
}
