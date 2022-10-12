import { toast } from "react-toastify";
import {
  GET_ACTAS,
  GET_EFECTOS,
  GET_ACTAS_EN_PROCESO,
  GET_ACTAS_EN_PROCESO_FILTERED,
  GET_EFECTOS_FROM_ACTA,
  GET_EFECTOS_EN_PROCESO_FILTERED,
} from "./actions";

let initialState = {
  allActas: [],
  actasEnProceso: [],
  allEfectos: [],
  efectosEnProceso: [],
  efectosFromActa: [],
  efectosFromActasSave: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTAS:
      return {
        ...state,
        allActas: action.payload,
      };
    case GET_EFECTOS:
      // eslint-disable-next-line
      const efectosEnProceso = action.payload.filter((efecto) => efecto.estado === "en proceso");
      return {
        ...state,
        allEfectos: action.payload,
        efectosEnProceso: efectosEnProceso,
      };
    case GET_ACTAS_EN_PROCESO:
      return {
        ...state,
        actasEnProceso: action.payload,
      };
    case GET_ACTAS_EN_PROCESO_FILTERED:
      return {
        ...state,
        actasEnProceso: action.payload,
      };
    case GET_EFECTOS_FROM_ACTA:
      return {
        ...state,
        efectosFromActa: action.payload,
        efectosFromActaSave: action.payload,
      };
    case GET_EFECTOS_EN_PROCESO_FILTERED: {
      const { nroPrecinto, marca, estado } = action.payload;

      let efectosFiltrados;
      if (!nroPrecinto && !marca && !estado) {
        //* Ninguno
        efectosFiltrados = state.efectosFromActaSave;
      } else if (nroPrecinto && marca && estado) {
        //* Todos
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          if (estado === "en proceso") {
            console.log("entre");
            return (
              ef.estado === "en proceso" && ef.marca.match(marca) && String(ef.Bolsa.nro_precinto).match(nroPrecinto)
            );
          } else {
            return (
              ef.estado === "completo" && ef.marca.match(marca) && String(ef.Bolsa.nro_precinto).match(nroPrecinto)
            );
          }
        });
      } else if (nroPrecinto && marca && !estado) {
        //* Sin estado
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          return String(ef.Bolsa.nro_precinto).match(nroPrecinto) && ef.marca.match(marca);
        });
      } else if (nroPrecinto && !marca && !estado) {
        //* Sin estado ni marca
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          return String(ef.Bolsa.nro_precinto).match(nroPrecinto);
        });
      } else if (!nroPrecinto && marca && !estado) {
        //* Solo marca
        efectosFiltrados = state.efectosFromActa.filter((ef) => {
          return ef.marca.match(marca);
        });
      } else if (!nroPrecinto && !marca && estado) {
        //* Solo estado
        efectosFiltrados = state.efectosFromActaSave.filter((ef) => {
          if (estado === "en proceso") {
            console.log("entre");
            return ef.estado === "en proceso";
          } else {
            return ef.estado === "completo";
          }
        });
      } else if (!nroPrecinto && marca && estado) {
        efectosFiltrados = state.efectosFromActaSave.filter((ef) => {
          if (estado === "en proceso") {
            console.log("entre");
            return ef.estado === "en proceso" && ef.marca.match(marca);
          } else {
            return ef.estado === "completo" && ef.marca.match(marca);
          }
        });
      } else if (nroPrecinto && !marca && estado) {
        efectosFiltrados = state.efectosFromActaSave.filter((ef) => {
          if (estado === "en proceso") {
            console.log("entre");
            return ef.estado === "en proceso" && String(ef.Bolsa.nro_precinto).match(nroPrecinto);
          } else {
            return ef.estado === "completo" && String(ef.Bolsa.nro_precinto).match(nroPrecinto);
          }
        });
      }

      if (efectosFiltrados?.length === 0) {
        toast.warning("Efecto no encontrado");
      }
      return {
        ...state,
        efectosFromActa: efectosFiltrados,
      };
    }
    default:
      return state;
  }
}

export default reducer;
