import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { Box, Typography, Avatar } from '@mui/material'

function ProfilePage() {
  const { profile } = useAppSelector((state) => state.user)

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Профиль пользователя
      </Typography>
      <Avatar
        src={profile.avatar}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography>Имя: {profile.name}</Typography>
      <Typography>Email: {profile.email}</Typography>
      <Typography>Группа: {profile.group}</Typography>
    </Box>
  )
}

export default ProfilePage
