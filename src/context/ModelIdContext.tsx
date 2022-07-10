import { createContext, ReactElement, useContext, useState } from 'react';

const ModelIdContext = createContext<
  { modelId: string | null; setModelId: (modelId: string | null) => void } | undefined
>(undefined);

export function useModelId() {
  const context = useContext(ModelIdContext);
  if (context === undefined) {
    throw new Error('useModelId must be used within an ModelIdProvider');
  }
  return context;
}

export function ModelIdProvider(props: { children: ReactElement | ReactElement[] }) {
  const [modelId, setModelId] = useState<string | null>(null);

  return (
    <ModelIdContext.Provider value={{ modelId: modelId, setModelId: setModelId }}>
      {props.children}
    </ModelIdContext.Provider>
  );
}
