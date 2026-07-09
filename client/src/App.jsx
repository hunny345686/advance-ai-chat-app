import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../utils/firebase"
import api from "../utils/axios"

function App() {


  const handelLogin = async(token) => {
    console.log("token", token)
      try {
        const {data} = await api.post("/auth/login", {token})
        console.log(data)
      } catch (error) {
        console.log(error)
      }
  }
  
  const googleLogin = async() => {
    const data =  await signInWithPopup(auth, googleProvider)
    const d = await handelLogin( await data.user.getIdToken())
  }
  return (
    <div >
      <button onClick={googleLogin}>Continew With Google</button>
    </div>
  )
}

export default App
