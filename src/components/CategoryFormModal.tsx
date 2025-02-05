import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material'
import { Category } from '../types/category'

interface CategoryFormModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: Omit<Category, 'id'> & { id?: string }) => void
  category?: Category
}

function CategoryFormModal({ open, onClose, onSave, category }: CategoryFormModalProps) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (category) {
      setName(category.name)
    } else {
      setName('')
    }
  }, [category])

  const handleSave = () => {
    if (!name) return
    onSave({
      id: category?.id,
      name,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{category ? 'Редактировать категорию' : 'Добавить категорию'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Название"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSave}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryFormModal
