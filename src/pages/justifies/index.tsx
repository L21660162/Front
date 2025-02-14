import React from 'react';
import PageHeading from '../../components/ui/justifies/justifiesHeding';
import JustifyCrud from '../../components/ui/justifies/justifiesCrud';
import ReviewJustify from '../../components/ui/justifies/justifeView';
import { TokenData } from '../../store/auth/type';
import { useAccessTokenData } from '../../store/auth/store';
import { IRoles } from '../../graphql/graphql';

function Justify() {
  const { roles } = useAccessTokenData() as TokenData;
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        {roles.includes(IRoles.Docente) ? <JustifyCrud /> : <ReviewJustify />}
      </div>
    </div>
  );
}

export default Justify;
