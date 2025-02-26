import PeriodCrud from '../../components/ui/period/periodCrud';
import PageHeadingperiod from '../../components/ui/period/periodHeading';

function periodSettings() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeadingperiod />
        </div>
      </div>
      <div className="col-12">
        <PeriodCrud />
      </div>
    </div>
  );
}

export default periodSettings;
