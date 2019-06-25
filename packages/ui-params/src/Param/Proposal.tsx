// Copyright 2017-2019 @polkadot/ui-app authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Props } from '../types';

import React from 'react';
import { Extrinsic, Method } from '@polkadot/types';
import { withApi } from '@polkadot/ui-api';
import { ApiProps } from '@polkadot/ui-api/types';
import { Call, Static } from '@polkadot/ui-app';
import { classes } from '@polkadot/ui-app/util';

import Bare from './Bare';
import Unknown from './Unknown';

class Proposal extends React.PureComponent<Props & ApiProps> {
  render () {
    const { api, className, defaultValue: { value }, isDisabled, label, style, withLabel } = this.props;

    if (!isDisabled) {
      return (
        <Unknown {...this.props} />
      );
    }

    const proposal = value as Extrinsic;
    const { method, section } = Method.findByCallIndex(proposal.callIndex, api.runtimeMetadata);

    return (
      <Bare>
        <Static
          className={classes(className, 'full')}
          label={label}
          style={style}
          withLabel={withLabel}
        >
          {section}.{method}
        </Static>
        <Call value={proposal} />
      </Bare>
    );
  }
}

export default withApi(Proposal);