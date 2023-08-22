import React, { useState } from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'
import logo from "../assets/logo.png"
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [showCategories, setShowCategories] = useState(false)

  const toggleCategories = () => {
    setShowCategories((prevShowCategories) => !prevShowCategories)
  }

  const closeMenu = () => {
    setShowCategories(false)
  }
  const { userInfo } = useSelector((state) => state.auth)
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate(`/login`)
    } catch (error) {
      console.log(error)
    }
  }

  const adminMenu = userInfo && userInfo.isAdmin && (
    <div className='admin-menu'>
      <div className='nav-dropdown'>
        <div className='nav-dropdown-title'>Admin</div>
        <ul className='nav-dropdown-items'>
          <li>
            <Link to='/admin/productlist'>Products</Link>
          </li>
         
          
        </ul>
      </div>
    </div>
  )

  return (
    <nav className='navbar'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='' className='logo' />
        </Link>
      </div>

      <div className='cart'>
        <Link to='/cart'>
          <FaShoppingCart /> Panier
          {cartItems.length > 0 && (
            <div className='cart-badge'>
              {cartItems.reduce((totalQty, item) => totalQty + item.qty, 0)}
            </div>
          )}
        </Link>
      </div>
      <div className={`categories ${showCategories ? 'active' : ''}`}>
        <ul>
          <li>
            VAISSELLE
            <ul className='sub-categories'>
              <li onClick={closeMenu}>
                <Link to={`/tableware`}>Vaisselle</Link>
              </li>
            </ul>
          </li>
          <li>
            TISSUE
            <ul className='sub-categories'>
              <li onClick={closeMenu}>
                <Link to={`/tissue`}>Tissue</Link>
              </li>
            </ul>
          </li>
          <li>
            VÉTEMENTS
            <ul className='sub-categories'>
              <li onClick={closeMenu}>
                <Link to={`/woman`}>Vêtements</Link>
              </li>
            </ul>
          </li>
          <li>
            SAC POUR LES FILLES
            <ul className='sub-categories'>
              <li onClick={closeMenu}>
                <Link to={`/bag`}>Sac pour filles</Link>
              </li>
            </ul>
          </li>
          <li>
            CHAUSSURES
            <ul className='sub-categories'>
              <li onClick={closeMenu}>
                <Link to={`/shoes`}>Chaussures</Link>
              </li>
            </ul>
          </li>
          {/* Add more categories here */}
        </ul>
      </div>
      <div className='hamburger-menu' onClick={toggleCategories}>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>

      <div className='nav-links'>
        <Link to='/'>Accueil</Link>
        <Link to='/options'>Nos options</Link>
        <Link to='/history'>Historique</Link>
        <Link to='/commander'>Commander</Link>
      </div>
      <div className='custom-nav'>
        {userInfo ? (
          <div className='nav-dropdown'>
            <span className='nav-username'>{userInfo.name}</span>
            <div className='nav-dropdown-content'>
              <button onClick={logoutHandler}>déconnexion</button>
            </div>
          </div>
        ) : (
          <Link to='/login' className='nav-link'>
            <FaUser /> YAYE TENNING
          </Link>
        )}
      </div>
      {adminMenu}
      
    </nav>
  )
}

export default Navbar
