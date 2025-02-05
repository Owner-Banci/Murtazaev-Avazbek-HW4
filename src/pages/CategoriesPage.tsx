import React, { useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch' 
import {
  addCategory,
  updateCategory,
  deleteCategory
} from '../store/slices/categoriesSlice'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Box
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CategoryFormModal from '../components/CategoryFormModal'
import { Category } from '../types/category'

function CategoriesPage() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories.list)

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAdd = (data: Omit<Category, 'id'>) => {
    dispatch(addCategory(data))
    setIsModalOpen(false)
  }

  const handleUpdate = (data: Category) => {
    dispatch(updateCategory(data))
    setIsModalOpen(false)
  }

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id))
  }

  const openAddModal = () => {
    setSelectedCategory(undefined)
    setIsModalOpen(true)
  }

  const openEditModal = (cat: Category) => {
    setSelectedCategory(cat)
    setIsModalOpen(true)
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Управление категориями</Typography>
        <Button variant="contained" onClick={openAddModal}>
          Добавить категорию
        </Button>
      </Box>

      <List>
        {categories.map((cat) => (
          <ListItem
            key={cat.id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => openEditModal(cat)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(cat.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>

      <CategoryFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (selectedCategory) {
            // Редактирование
            handleUpdate(data as Category)
          } else {
            // Добавление
            handleAdd(data)
          }
        }}
        category={selectedCategory}
      />
    </Box>
  )
}

export default CategoriesPage
