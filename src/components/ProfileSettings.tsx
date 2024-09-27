import { useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from '../services'
import { User } from '../types'

const ProfileSettings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getUserProfile()
      setUser(response.data)
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      if (user) {
        const updatedUser = { ...user, password, email }
        await updateUserProfile(updatedUser)
        setUser(updatedUser)
        setSuccess('Profile updated successfully')
        setError('')
      }
    } catch (error: any) {
      setError('Failed to update profile: ' + error.message)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto p-6 bg-background text-font rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-font mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-font-muted text-sm font-semibold mb-2">
            Username:
          </label>
        <input
            id="username"
            type="username"
            placeholder="New username"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImg" className="block text-font-muted text-sm font-semibold mb-2">
            Profile Image:
          </label>
        <input
            id="profileImg"
            type="profileImg"
            placeholder="New Profile Image"
            value={user.profile_picture}
            onChange={(e) => setUser({...user, profile_picture: e.target.value})}
            className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-font-muted text-sm font-semibold mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="New email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-font-muted text-sm font-semibold mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-font-muted text-sm font-semibold mb-2">
            Confirm Password:
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-input-bg text-font border border-border-color rounded focus:outline-none focus:ring-1 focus:ring-input-focus"
          />
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-primary text-font-button font-bold rounded hover:bg-primary-hover transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default ProfileSettings
