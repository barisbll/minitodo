export type TodoUpdate = {
    id: string;
    content: string;
  };

export const initialState = {
    isEditing: false,
    isDeleting: false,
    isCopying: false,
  };
  
export type MoreState = typeof initialState;
  export type MoreAction = {
    type: "edit" | "delete" | "copy";
    state: boolean;
  };