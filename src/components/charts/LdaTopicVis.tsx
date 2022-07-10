import { useEffect, useState } from 'react';
import { LdaVisData } from '../../types';
import { useRefresh } from '../../context/RefreshContext';
import { useNetworkGet } from '../../network';
import LoadingCircle from '../LoadingCircle';
import { LDAvis } from 'react-ldavis';
import { useModelId } from '../../context/ModelIdContext';

export default function LdaTopicVis() {
  const [ldaVisData, setLdaVisData] = useState<LdaVisData | undefined>(undefined);
  const refresh = useRefresh();
  const { modelId } = useModelId();

  const { refetch, isFetching } = useNetworkGet(
    `fe/topics/lda`,
    'lda',
    (data) => {
      setLdaVisData(data.outputData);
    },
    modelId ? { modelId: modelId } : {}
  );

  useEffect(() => {
    refresh.addRefetch(refetch);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingCircle isFetching={isFetching}>
        {ldaVisData ? (
          <LDAvis data={ldaVisData} modifyHistory={true} />
        ) : (
          <div
            style={{
              color: 'grey',
            }}
          >
            No data
          </div>
        )}
      </LoadingCircle>
    </div>
  );
}
