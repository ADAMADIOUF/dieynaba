import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className='section-center'>
      <h1>Connexion</h1>
      <form onSubmit={submitHandler}>
        <div className='my-3'>
          <label htmlFor='email'>Adresse e-mail</label>
          <input
            type='email'
            id='email'
            placeholder="entrer l\'adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='my-3'>
          <label htmlFor='password'>Mot de passe</label>
          <input
            type='password'
            id='password'
            placeholder='entrer le mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary mt-2'
          disabled={isLoading}
        >
          Se connecter
        </button>
        {isLoading && <Loading />}
      </form>
      <div className='py-3'>
        <span>Nouveau client ? </span>
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          S'inscrire
        </Link>
      </div>
    </div>
  )
}

export default Login
