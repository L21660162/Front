import React from 'react';
import ReviewJustify from '../../components/ui/justify/justifeView';
import JustifyCrud from '../../components/ui/justify/justifiesCrud';
import PageHeading from '../../components/ui/justify/justifiesHeding';
import { IRoles } from '../../graphql/graphql';
import { useAccessTokenData } from '../../store/auth/store';
import { TokenData } from '../../store/auth/type';

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
