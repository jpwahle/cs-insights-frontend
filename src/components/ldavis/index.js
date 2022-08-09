/* Taken from https://github.com/thesseyren/react-ldavis*/
import React from 'react';
import { isEqual, uniqueId } from 'lodash';

import LDAvisLegacy from './ldavis';
import styles from './styles.module.css';

export class LDAvis extends React.Component {
  static defaultProps = {
    modifyHistory: false,
  };

  constructor(props) {
    super(props);

    this.id = uniqueId('LDAvis-');
    this.vis = React.createRef();
  }

  generateVis = () => new LDAvisLegacy('#' + this.id, this.props.data, this.props.modifyHistory);

  clearVis = () => {
    this.vis.current.innerHTML = '';
  };

  componentDidMount = () => this.generateVis();

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps, this.props)) {
      this.clearVis();
      this.generateVis();
    }
  }

  render = () => (
    <div ref={this.vis} id={this.id} className={styles.LDAvis} style={this.props.style}></div>
  );
}
