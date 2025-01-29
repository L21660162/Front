import React from 'react';
import PageHeading from '../../components/ui/event/eventHeding';
import EventCrud from '../../components/ui/event/eventCrud';

function Events() {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <PageHeading />
        </div>
      </div>
      <div className="col-12">
        <EventCrud />
      </div>
    </div>
  );
}

export default Events;
