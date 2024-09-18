import React from "react";
import { useReducer } from "react";

export default function useCreateProductReducer() {
  const ACTIONS = {
    CHANGE_NAME: "CHANGE_NAME",
    CHANGE_DESCRIPTION: "CHANGE_DESCRIPTION",
    CHANGE_IMAGES: "CHANGE_IMAGES",
    CHANGE_VARIANTS: "CHANGE_VARIANTS",
    CHANGE_ACTIVE: "CHANGE_ACTIVE",
    CHANGE_VARIANT_DETAIL: "CHANGE_VARIANT_DETAIL",
    CHANGE_FUNCTION: "CHANGE_FUNCTION",
    CHANGE_ROOM_TYPE: "CHANGE_ROOM_TYPE",
  };

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.CHANGE_NAME:
        return { ...state, productName: action.next };
      case ACTIONS.CHANGE_DESCRIPTION:
        return { ...state, description: action.next };
      case ACTIONS.CHANGE_IMAGES:
        return { ...state, images: action.next };
      case ACTIONS.CHANGE_VARIANTS:
        return { ...state, variants: action.next };
      case ACTIONS.CHANGE_ACTIVE:
        return { ...state, active: action.next };
      case ACTIONS.CHANGE_VARIANT_DETAIL:
        return { ...state, variant_detail: action.next };
      case ACTIONS.CHANGE_ROOM_TYPE:
        return { ...state, roomType: action.next };
      case ACTIONS.CHANGE_FUNCTION:
        return { ...state, roomFuncion: action.next };
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    productName: "",
    roomType: null,
    roomFuncion: null,
    description: "",
    images: [],
    variants: [1, 2],
    variant_detail: [],
    active: true,
  });

  return [state, dispatch, ACTIONS];
}
