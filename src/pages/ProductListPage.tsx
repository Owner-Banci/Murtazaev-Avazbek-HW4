import React, { useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch' 
import { deleteProduct, addProduct } from '../store/slices/productsSlice'
import ProductFormModal from '../components/ProductFormModal'
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Pagination,
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch as useDispatchProper } from '../hooks/useAppDispatch'

function ProductListPage() {
  const dispatch = useDispatchProper()
  const products = useAppSelector((state) => state.products.list)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [page, setPage] = useState(1)
  const itemsPerPage = 5
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageCount = Math.ceil(products.length / itemsPerPage)

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id))
  }

  const handleAddProduct = (data: any) => {
    dispatch(addProduct(data))
    setIsModalOpen(false)
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Список товаров</Typography>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Добавить товар
        </Button>
      </Box>

      <Grid container spacing={2}>
        {products.slice(startIndex, endIndex).map((product) => (
          <Grid item xs={12} md={6} lg={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography>Категория: {product.categoryId}</Typography>
                <Typography>Цена: {product.price}</Typography>
                <Typography>Количество: {product.quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/products/${product.id}`}
                  variant="outlined"
                >
                  Подробнее
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDelete(product.id)}
                >
                  Удалить
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Пагинация */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Модальное окно для добавления товара */}
      <ProductFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  )
}

export default ProductListPage
