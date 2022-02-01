import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Spotify Clone | by Majkel</title>
        {/* favicon */}
      </Head>

      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div>
        {/* Player */}
      </div>

    </div>
  )
}
