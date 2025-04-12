import { useNavigate } from "react-router"

import { useEffect } from "react"
import App from "../../components/invoice/invoice"
import { isAuthenticated, logout } from "../../router"

export function Dash() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) {
      alert('Autenticação inválida! Redirecionamento...')

      logout()

      navigate('/sign-in')
    }
  }, [])

  return (
    <>
      <App/>
    </>
  )
}