import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import ClassroomService from '@services/ClassroomService'
import { StatusMessage } from '@types'
import { useTranslation } from 'next-i18next'

const AddClassroomForm: React.FC = () => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState<string | null>(null)
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([])
  const router = useRouter()

  const { t } = useTranslation()

  const clearErrors = () => {
    setNameError(null)
    setStatusMessages([])
  }

  const validate = (): boolean => {
    let result = true

    if (!name || name.trim() === '') {
      setNameError(t('classroom.validate.name'))
      result = false
    }

    return result
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    clearErrors()

    if (!validate()) {
      return
    }

    const classroom = { name: name.trim() }
    const response = await ClassroomService.addClassroom(classroom)

    if (response.status === 201) {
      const createdClassroom = await response.json()
      setStatusMessages([{
        message: t('classroom.success', { id: createdClassroom.id }),
        type: 'success'
      }])
      setName('')
    } else if (response.status === 400) {
      const { errorMessage } = await response.json()
      setStatusMessages([{ message: errorMessage || t('classroom.error.duplicate'), type: 'error' }])
    } else if (response.status === 401 || response.status === 403) {
      const { errorMessage } = await response.json()
      setStatusMessages([{ message: errorMessage || t('classroom.error.unauthorized'), type: 'error' }])
    } else {
      setStatusMessages([
        {
          message: t('general.error'),
          type: 'error',
        },
      ])
    }
  }

  return (
      <div className="max-w-sm m-auto">
        <div>
          <h3 className="px-0">{t('classroom.title')}</h3>
        </div>
        {statusMessages.length > 0 && (
            <div className="row">
              <ul className="list-none mb-3 mx-auto ">
                {statusMessages.map(({ message, type }, index) => (
                    <li
                        key={index}
                        className={classNames({
                          ' text-red-800': type === 'error',
                          'text-green-800': type === 'success',
                        })}>
                      {message}
                    </li>
                ))}
              </ul>
            </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label
                  htmlFor="nameInput"
                  className="block mb-2 text-sm font-medium">
                {t('classroom.label.name')}
              </label>
            </div>
            <div className="block mb-2 text-sm font-medium">
              <input
                  id="nameInput"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
              />
              {nameError && <div className="text-red-800 ">{nameError}</div>}
            </div>
          </div>

          <div className="row">
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit">
              {t('classroom.button')}
            </button>
          </div>
        </form>
      </div>
  )
}

export default AddClassroomForm