import { useEffect, useReducer } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { cartReducer, initialCartState } from "./reducers/cart-reducer"

function App() {

  /*
 Inicializamos el estado global del carrito utilizando useReducer,
 que nos permite manejar lógica compleja de estado de forma centralizada
 a través del reducer.

 dispatch es la función que utilizamos para enviar acciones al reducer.
*/

  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])


  return (
    <>
      <Header
        cart={state.cart} // Pasamos el estado del carrito al Header para mostrar el número de items
        dispatch={dispatch} // Pasamos la función dispatch al Header para que pueda enviar acciones al reducer desde el componente Header
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              dispatch={dispatch}
            />
          ))}

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
