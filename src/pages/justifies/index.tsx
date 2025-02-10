import React from 'react';
import PageHeading from '../../components/ui/justifies/justifiesHeding';
import JustifyCrud from '../../components/ui/justifies/justifiesCrud';
import ReviewJustify from '../../components/ui/justifies/justifeView';

function Justify() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        {/* <JustifyCrud /> */}
        <ReviewJustify />
      </div>
    </div>
  );
}

export default Justify;
