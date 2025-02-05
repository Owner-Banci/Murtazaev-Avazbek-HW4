import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Мой магазин
          </Typography>
          <Button color="inherit" component={Link} to="/">Товары</Button>
          <Button color="inherit" component={Link} to="/categories">Категории</Button>
          <Button color="inherit" component={Link} to="/profile">Профиль</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout
