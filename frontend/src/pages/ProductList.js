import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import Error from '../components/Error'
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../slices/productsApiSlice'

const ProductList = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery()
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Êtes-vous sûr(e) ?')) {
      try {
        await deleteProduct(id)
        refetch()
        toast.success('Produit supprimé')
      } catch (error) {
        const errorMessage =
          error && error.message
            ? error.message
            : 'Une erreur est survenue lors de la suppression du produit.'
        toast.error(errorMessage)
      }
    }
  }

  const createProductHandler = async () => {
    if (
      window.confirm('Êtes-vous sûr(e) de vouloir créer un nouveau produit ?')
    ) {
      try {
        await createProduct()
        refetch()
        toast.success('Produit créé avec succès') // Display success message
      } catch (error) {
        const errorMessage =
          error && error.message
            ? error.message
            : 'Une erreur est survenue lors de la création du produit.'
        toast.error(errorMessage)
      }
    }
  }

  return (
    <>
      <div className='product-header-list section-center'>
        <h1>Produits</h1>
        <button
          className='btn btn-sm m-3 create-btn'
          onClick={createProductHandler}
        >
          <FaEdit /> Créer un produit
        </button>
      </div>

      {loadingCreate || loadingDelete || isLoading ? (
        <Loading />
      ) : error ? (
        <Error variant='danger'>{error}</Error>
      ) : (
        <>
          <table className='table table-striped table-hover table-sm'>
            {/* Table header */}
            <thead>
              <tr>
                <th>ID</th>
                <th>NOM</th>
                <th>PRIX</th>
                <th>CATÉGORIE</th>
                <th>MARQUE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows */}
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className='btn btn-light btn-sm mx-2'>
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default ProductList
