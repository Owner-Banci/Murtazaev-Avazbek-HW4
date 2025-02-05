import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { Product } from '../types/product'
import { Button, Typography, Box } from '@mui/material'
import { deleteProduct, updateProduct } from '../store/slices/productsSlice'
import ProductFormModal from '../components/ProductFormModal'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const product = useAppSelector((state) =>
    state.products.list.find((p) => p.id === id)
  )

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (!product) {
    return <Typography>Товар не найден</Typography>
  }

  const handleDelete = () => {
    dispatch(deleteProduct(product.id))
    navigate('/')
  }

  const handleUpdate = (data: Product) => {
    dispatch(updateProduct(data))
    setIsEditModalOpen(false)
  }

  return (
    <Box>
      <Typography variant="h4">{product.title}</Typography>
      <Typography>Описание: {product.description}</Typography>
      <Typography>Категория: {product.categoryId}</Typography>
      <Typography>Цена: {product.price}</Typography>
      <Typography>Количество: {product.quantity}</Typography>

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={() => setIsEditModalOpen(true)}
          sx={{ mr: 2 }}
        >
          Редактировать
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Удалить
        </Button>
      </Box>

      <ProductFormModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => handleUpdate(data as Product)}
        product={product}
      />
    </Box>
  )
}

export default ProductDetailPage
