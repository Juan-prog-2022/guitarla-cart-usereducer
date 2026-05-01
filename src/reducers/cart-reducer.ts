import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

/*
 Definimos las acciones que representan los distintos cambios de estado
 posibles en el carrito de compras.

 Cada acción representa un evento del dominio del carrito
 (por ejemplo: agregar un producto, eliminarlo, etc.).

 En lugar de modificar el estado directamente mediante funciones (como con useState),
 utilizamos un reducer, al cual se le envían acciones mediante dispatch.

 Cada acción describe QUÉ se quiere hacer,
 y el reducer se encarga de definir CÓMO se actualiza el estado.

 Esto permite centralizar la lógica del carrito, hacerla más predecible,
 mantenible y fácil de escalar.

 Estas acciones pueden ser despachadas desde cualquier componente
 que tenga acceso al dispatch.
*/

export type CartActions =
  | { type: "ADD_TO_CART"; payload: { item: Guitar } }
  | { type: "REMOVE_FROM_CART"; payload: { id: Guitar["id"] } }
  | { type: "INCREASE_QUANTITY"; payload: { id: Guitar["id"] } }
  | { type: "DECREASE_QUANTITY"; payload: { id: Guitar["id"] } }
  | { type: "CLEAR_CART" };

/*
 Definimos el tipo del estado del carrito, que incluye la lista de productos disponibles (data)
 y el carrito actual (cart), que es una lista de CartItem.
*/

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

// función para obtener el carrito desde localStorage (persistencia inicial)
const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

/*
 Definimos el estado inicial del carrito, que incluye la lista de productos disponibles (data)
 y el carrito vacío (cart).
*/

export const initialCartState: CartState = {
  data: db,
  cart: initialCart(),
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

/*
 Definimos el reducer del carrito, que es una función pura que recibe el estado actual
 y una acción, y devuelve el nuevo estado actualizado según la acción recibida.

 El reducer se encarga de manejar cada tipo de acción y actualizar el estado del carrito
 de manera predecible y consistente.
*/
export const cartReducer = (
  state: CartState = initialCartState, // para tipado y valor inicial
  action: CartActions, // para tipado de acciones
) => {
  if (action.type === "ADD_TO_CART") {
    const itemExists = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id,
    );

    let updatedCart: CartItem[] = [];

    if (itemExists) {
      // existe en el carrito
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          // elemento a actualizar
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 }; // aumentamos la cantidad
          } else {
            return item; // no aumentamos más allá del máximo permitido
          }
        } else {
          return item; // no cambia el item
        }
      });
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem]; // agregamos el nuevo item al carrito sin mutar el estado original
    }
    return {
      ...state, // mantenemos el estado original sin mutar
      cart: updatedCart, // actualizamos el carrito con la nueva lista de items
    };
  }

  // accion de eliminar un item del carrito, filtramos el carrito para remover el item con el id especificado
  if (action.type === "REMOVE_FROM_CART") {
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.id,
    ); // filtramos el carrito para remover el item con el id especificado
    return {
      ...state, // mantenemos el estado original sin mutar
      cart: updatedCart, // actualizamos el carrito con la nueva lista de items filtrada
    };
  }

  // accion de aumentar la cantidad de un item en el carrito, mapeamos el carrito para encontrar el item a actualizar y aumentamos su cantidad
  if (action.type === "INCREASE_QUANTITY") {
    const cart = state.cart.map((item) => {
      // mapeamos el carrito para encontrar el item a actualizar
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        // si encontramos el item y su cantidad es menor al máximo permitido
        return { ...item, quantity: item.quantity + 1 }; // aumentamos la cantidad del item sin mutar el estado original
      }
      return item; // si no es el item a actualizar o ya alcanzó el máximo, lo retornamos sin cambios
    });
    return {
      ...state, // mantenemos el estado original sin mutar
      cart, // actualizamos el carrito con la nueva lista de items mapeada
    };
  }

  // accion de disminuir la cantidad de un item en el carrito, mapeamos el carrito para encontrar el item a actualizar y disminuimos su cantidad, pero no permitimos que baje de 1
  if (action.type === "DECREASE_QUANTITY") {
    const cart = state.cart.map((item) => {
      // mapeamos el carrito para encontrar el item a actualizar
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        // si encontramos el item y su cantidad es mayor al mínimo permitido
        return { ...item, quantity: item.quantity - 1 }; // disminuimos la cantidad del item sin mutar el estado original
      }
      return item; // si no es el item a actualizar o ya alcanzó el mínimo, lo retornamos sin cambios
    });
    return {
      ...state,
      cart,
    };
  }

  // accion de limpiar el carrito, simplemente retornamos un nuevo estado con el carrito vacío
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};
