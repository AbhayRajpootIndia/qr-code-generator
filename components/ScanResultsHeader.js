import * as React from 'react';
import { Appbar } from 'react-native-paper';

function ScanResultsHeader(props) {
  const _goBack = () => console.log('Went back');

  const _handleShare = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={props._goBack || _goBack} />

      <Appbar.Content title={props.title || 'Scan results'} />

      <Appbar.Action
        icon="share"
        onPress={props._handleShare || _handleShare}
      />

      <Appbar.Action
        icon="dots-vertical"
        onPress={props._handleMore || _handleMore}
      />
    </Appbar.Header>
  );
}

export default ScanResultsHeader;
