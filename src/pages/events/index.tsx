import React from 'react';
import EventCrud from '../../components/ui/event/eventCrud';
import PageHeading from '../../components/ui/event/eventHeding';

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
