import { useEffect, useState } from 'react';
import { LdaVisData } from '../../types';
import { useRefresh } from '../../context/RefreshContext';
import { useNetworkGet } from '../../network';
import ChartLoadingIcon from '../ChartLoadingIcon';
import { LDAvis } from 'react-ldavis';
import { useModelId } from '../../context/ModelIdContext';

export default function LdaTopicVis(props: { route: string }) {
  const [ldaVisData, setLdaVisData] = useState<LdaVisData | undefined>(undefined);
  const refresh = useRefresh();
  const { modelId } = useModelId();
  const queryKey = props.route + 'Lda';

  const { refetch, isFetching } = useNetworkGet(
    `fe/${props.route}/lda`,
    queryKey,
    (data) => {
      setLdaVisData(data.outputData);
    },
    modelId ? { modelId: modelId } : {}
  );

  useEffect(() => {
    refresh.addRefetch(queryKey, refetch);
    return () => {
      refresh.removeRefetch(queryKey);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ChartLoadingIcon isFetching={isFetching}>
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
      </ChartLoadingIcon>
    </div>
  );
}
