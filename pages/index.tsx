/* eslint-disable @next/next/link-passhref */
import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import * as React from 'react'

export default function Home({ notes }: any) {
  console.log(notes)
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="">Heelo</div>
      <button type="submit"> Submit</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient()

  const notes = await prisma.noteData.findMany({
    select: {
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
