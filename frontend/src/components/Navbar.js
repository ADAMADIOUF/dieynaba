import React, { useState } from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const [showCategories, setShowCategories] = useState(false)
  const toggleCategories = () => {
    setShowCategories(!showCategories)
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
        <Link to='/'>Logo</Link> {/* Make the Logo text a link */}
      </div>
      <div className='search'>Search</div>
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
              <Link to={`/tableware`}>
                <li>Vaisselle</li>
              </Link>
            </ul>
          </li>
          <li>
            TISSUE
            <ul className='sub-categories'>
              <Link to={`/tissue`}>
                <li>Tissue</li>
              </Link>
            </ul>
          </li>
          <li>
            VÉTEMENTS
            <ul className='sub-categories'>
              <Link to={`/woman`}>
                <li>vêtements</li>
              </Link>
            </ul>
          </li>
          <li>
            SAC POUR LES FILLES
            <ul className='sub-categories'>
              <Link to={`/bag`}>
                <li>Sac pour filles</li>
              </Link>
            </ul>
          </li>
          <li>
            CHAUSSURES
            <ul className='sub-categories'>
              <Link to={`/shoes`}>
                <li>Chaussures</li>
              </Link>
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
              <Link to='/profile'>Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to='/login' className='nav-link'>
            <FaUser /> Sign In
          </Link>
        )}
      </div>
      {adminMenu}
    </nav>
  )
}

export default Navbar
