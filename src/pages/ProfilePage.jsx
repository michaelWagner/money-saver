// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react'
import ProfileInfo from '../components/ProfileInfo'
import ProfileSettings from '../components/ProfileSettings'
import { getUserProfile } from '../api' // Assuming you have an api file

const ProfilePage = () => {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile()
        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div>
      <ProfileInfo profile={profile} />
      <ProfileSettings />
    </div>
  )
}

export default ProfilePage
