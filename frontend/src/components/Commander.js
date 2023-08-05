import React, { useState } from 'react'
import { useSendContactFormMutation } from '../slices/contactApiSlice'

const Commander = () => {
  const [nom, setNom] = useState('')
  const [adresse, setAdresse] = useState('')
  const [telephone, setTelephone] = useState('')
  const [produit, setProduit] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [sendContactForm, { isLoading, isError }] = useSendContactFormMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = {
        nom,
        adresse,
        telephone,
        produit,
      }

      const result = await sendContactForm(formData)

      if (result.error) {
        console.error('Form submission failed')
      } else {
        console.log('Form submitted successfully')
        setIsFormSubmitted(true)

        // Set a timeout to reset the isFormSubmitted state after 5 seconds
        setTimeout(() => {
          setIsFormSubmitted(false)
        }, 5000)
      }

      setNom('')
      setAdresse('')
      setTelephone('')
      setProduit('')
    } catch (error) {
      console.error('An error occurred while submitting the form:', error)
    }
  }

  return (
    <div className='commander-container'>
      <h2>Passer une commande</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='nom'>Nom :</label>
          <input
            type='text'
            id='nom'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='adresse'>Adresse :</label>
          <input
            type='text'
            id='adresse'
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='telephone'>Téléphone :</label>
          <input
            type='tel'
            id='telephone'
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='produit'>Produit :</label>
          <input
            type='text'
            id='produit'
            value={produit}
            onChange={(e) => setProduit(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Envoi en cours...' : 'Passer la commande'}
        </button>
        {isFormSubmitted && !isError && (
          <p style={{ color: 'green' }}>Message envoyé avec succès!</p>
        )}
        {isError && (
          <p>Une erreur s'est produite lors de l'envoi du formulaire.</p>
        )}
      </form>
    </div>
  )
}

export default Commander
