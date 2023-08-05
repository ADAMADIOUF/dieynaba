import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Loading from '../components/Loading'
import Error from '../components/Error'
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../slices/productsApiSlice'

const ProductEditScreen = () => {
  const { id: productId } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId)
console.log(product);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    }
    const result = await updateProduct(updatedProduct)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Produit mis à jour')
      navigate('/admin/productlist')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className='section-center'>
      <Link to={`/admin/productlist`} className='btn btn-light my-3'>
        Retour
      </Link>
      <div>
        <h1>Modifier le produit</h1>
        {loadingUpdate && <Loading />}
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error variant='danger'>{error}</Error>
        ) : (
          <form onSubmit={submitHandler}>
            <div>
              <label>Nom</label>
              <input
                type='text'
                placeholder='Entrez le nom'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Prix</label>
              <input
                type='number'
                placeholder='Entrez le prix'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className='my-2'>
              <label>Image</label>
              <input
                type='text'
                placeholder="Entrez l'URL de l'image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                type='file'
                label='Choisir un fichier'
                onChange={uploadFileHandler}
              />
            </div>
            <div>
              <label>Marque</label>
              <input
                type='text'
                placeholder='Entrez la marque'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label>Stock disponible</label>
              <input
                type='number'
                placeholder='Entrez le stock disponible'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div>
              <label>Catégorie</label>
              <input
                type='text'
                placeholder='Entrez la catégorie'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type='text'
                placeholder='Entrez la description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type='submit' className='my-2'>
              Mettre à jour
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProductEditScreen
