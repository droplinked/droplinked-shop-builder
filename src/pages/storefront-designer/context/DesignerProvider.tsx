import { useProfile } from 'hooks/useProfile/useProfile';
import React, { useReducer, useEffect } from 'react';
import { initialStateDesignPage } from '../constants/initialState';
import { designerContext } from './designerContext';
import { designerReducer } from './designerReducer';
import { DesignerModelUtils } from '../utils/designerUtils';
interface DesignerProviderProps {
  children: React.ReactNode;
}

/**
 * Context provider for storefront designer
 */
function DesignerProvider({ children }: DesignerProviderProps): React.ReactElement {
  const { shop } = useProfile();
  const [state, dispatch] = useReducer(designerReducer, initialStateDesignPage);
  
  useEffect(() => {
    dispatch({
      type: 'updateState',
      params: { shop: DesignerModelUtils.refactorData(shop) },
    });
  }, [shop]);

  return (
    <designerContext.Provider 
      value={{
        state,
        methods: {
          dispatch,
          resetState: () => {}
        }
      }}
    >
      {children}
    </designerContext.Provider>
  );
}

export { DesignerProvider };