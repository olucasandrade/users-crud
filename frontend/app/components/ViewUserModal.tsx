"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface ViewUserModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string | null
}

interface UserDetails {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  updatedAt: string
}

export default function ViewUserModal({ isOpen, onClose, userId }: ViewUserModalProps) {
  const { data: user, isLoading } = useQuery<UserDetails>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
      return response.data
    },
    enabled: !!userId,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-100">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="text-gray-300">Loading...</div>
        ) : user ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm">Id</label>
              <div className="text-gray-100">{user.id}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm">First Name</label>
              <div className="text-gray-100">{user.firstName}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm">Last Name</label>
              <div className="text-gray-100">{user.lastName}</div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm">Email</label>
              <div className="text-gray-100">{user.email}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-300">User not found</div>
        )}
      </div>
    </div>
  )
}
