import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
      <div className="bg-black min-h-screen w-full flex flex-col items-center justify-center">
          <img className='w-52 mb-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png'/>
          
          {
            Object.values(providers).map(provider => (
              <div key={provider.name}>
                <button onClick={()=>signIn(provider.id, { callbackUrl: "/" })} className='text-white bg-[#18D860] p-5 rounded-full'>Login with {provider.name}</button>
              </div>
            ))
          }

      </div>
  )
}

export default Login;

export async function getServerSideProps() { 
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}
