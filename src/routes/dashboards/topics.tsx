import Frame from '../../components/Frame';
import 'react-ldavis/dist/index.css';
import { ModelIdProvider } from '../../context/ModelIdContext';
import LdaTopicVis from '../../components/charts/LdaTopicVis';

export default function Topics() {
  return (
    <ModelIdProvider>
      <Frame route={'topics'}>
        <LdaTopicVis />
      </Frame>
    </ModelIdProvider>
  );
}
