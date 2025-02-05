import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Product } from '../types/product'
import { useAppSelector } from '../hooks/useAppSelector'
import { Category } from '../types/category'

interface ProductFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: Omit<Product, 'id'> & { id?: string }) => void
  product?: Product
}

function ProductFormModal({ open, onClose, onSave, product }: ProductFormModalProps) {
  const categories = useAppSelector(state => state.categories.list)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    if (product) {
      setTitle(product.title)
      setDescription(product.description)
      setPrice(product.price)
      setQuantity(product.quantity)
      setCategoryId(product.categoryId)
    } else {
      // При добавлении нового товара сбрасываю поля
      setTitle('')
      setDescription('')
      setPrice(0)
      setQuantity(0)
      setCategoryId('')
    }
  }, [product])

  const handleSave = () => {
    // Проверка на заполненность
    if (!title || !description || !categoryId) return
    onSave({
      id: product?.id,
      title,
      description,
      price,
      quantity,
      categoryId,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product ? 'Редактировать товар' : 'Добавить товар'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Название"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Описание"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            value={categoryId}
            label="Категория"
            onChange={(e) => setCategoryId(e.target.value as string)}
          >
            {categories.map((cat: Category) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Цена"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label="Количество"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSave}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductFormModal
