import React from 'react';
import _ from 'lodash';

export default class Misc extends React.Component {
  render() {
    const html = '<a>link &nbsp; v</a>';
    // const html = _.escape('<a>link  v</a>');
    // const html = _.unescape('&lt;a&gt;link &nbsp; v&lt;/a&gt;');
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}
