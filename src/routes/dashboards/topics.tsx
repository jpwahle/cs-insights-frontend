import Frame from '../../components/Frame';
import { ModelIdProvider } from '../../context/ModelIdContext';
import LdaTopicVis from '../../components/visualizations/LdaTopicVis';

export default function Topics() {
  return (
    <ModelIdProvider>
      <Frame route={'topics'}>
        <LdaTopicVis route={'topics'} />
      </Frame>
    </ModelIdProvider>
  );
}
