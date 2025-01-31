import React from 'react';
import PageHeading from '../../components/ui/justifies/justifiesHeding';
import JustifyCrud from '../../components/ui/justifies/justifiesCrud';

function Justify() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        <JustifyCrud />
      </div>
    </div>
  );
}

export default Justify;
