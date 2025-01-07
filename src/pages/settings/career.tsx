import React from 'react';
import CareerCrud from '../../components/ui/career/careerCrud';
import PageHeadingCareer from '../../components/ui/career/careerHeading';


function CareerSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingCareer />
        </div>
      </div>
      <div className="col-12">
        <CareerCrud />
      </div>
    </div>
  );
}

export default CareerSettings;
