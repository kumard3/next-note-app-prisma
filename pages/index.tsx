/* eslint-disable @next/next/link-passhref */
import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'

import React, { useState, useEffect } from 'react'

export default function Home({ notes }: any) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [meta, setMeta] = useState('')
  const [newData, setNewData] = useState([])
  const [notesData, setNotesData] = useState(notes)
  const GetData = async () => {
    try {
      const response = await fetch('/api/note', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      setNewData(await response.json())
    } catch (error) {
      console.log(error)
    }
  }

  const handelSubmit = async (e: any) => {
    e.preventDefault()
    const body = { title, content, meta }
    try {
      const response = await fetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
        console.log('something went wrong')
      } else {
        resetForm()
        console.log('success')
        GetData()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const resetForm = () => {
    setTitle('')
    setContent('')
    setMeta('')
  }
  useEffect(() => {
    setNotesData(notes)
  }, [notes])

  const deletePost = async (id: number): Promise<void> => {
    await fetch(`/api/${id}`, {
      method: 'DELETE',
    })
    
  }
  console.log('first', '2')
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="">Heelo</div>
      <input
        type="text"
        placeholder="Title"
        className="py-1 px-5 border-white border bg-transparent"
        onChange={(e) => setTitle(e.target.value)}
      />{' '}
      <input
        type="content"
        placeholder="Content"
        className="py-1 px-5 border-white border bg-transparent"
        onChange={(e) => setContent(e.target.value)}
      />{' '}
      <input
        type="meta"
        placeholder="Meta"
        className="py-1 px-5 border-white border bg-transparent"
        onChange={(e) => setMeta(e.target.value)}
      />
      <button type="submit" onClick={handelSubmit}>
        {' '}
        Submit
      </button>
      <div className="grid grid-cols-3 gap-10">
        {notesData?.map(
          (
            n: { title: string; content: string; id: number },
            index: number,
          ) => {
            console.log(n)
            return (
              <div
                key={index}
                onClick={() => deletePost(n.id)}
                className="cursor-pointer border border-white text-4xl rounded-xl p-4"
              >
                <h1>{n.title}</h1>
                <p>{n.content}</p>
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient()

  const notes = await prisma.noteData.findMany({

    // where: { published: true },
    select: {
      id: true,
      title: true,
      content: true,
      meta: true,
    },
  })

  return {
    props: {
      notes,
    },
  }
}
