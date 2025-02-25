"use client"

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CreateUserModal from './CreateUserModal'
import axios from 'axios'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default function Users() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
        return response.data
      } catch (error) {
        console.error(error)
        return []
      }
    }
  })

  const handleCreate = () => {
    setIsCreateModalOpen(true)
  }

  const handleUpdate = (id: string) => {
    // TODO: Implement update user
  }

  const handleView = (id: string) => {
    // TODO: Implement view user
  }

  const handleDelete = (id: string) => {
    // TODO: Implement delete user
  }

  return (
    <div className="w-full max-w-5xl px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">Users</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Create User
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleView(user.id)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['users'] })
        }}
      />
    </div>
  )
}
