/* code taken from https://github.com/visgl/react-map-gl/blob/7.0-release/examples/draggable-markers/src/control-panel.tsx */

import * as React from 'react';
import type {LngLat} from 'react-map-gl';

const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value:number) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function ControlPanelMarker(props: {events: Record<string, LngLat>}) {
  return (
    <div className="control-panel">
      <h3>Draggable Marker</h3>
      <p>Try dragging the marker to another location.</p>
      <div>
        {eventNames.map(eventName => {
          const {events = {}} = props;
          const lngLat = events[eventName];
          return (
            <div key={eventName}>
              <strong>{eventName}:</strong>{' '}
              {lngLat ? `${round5(lngLat.lng)}, ${round5(lngLat.lat)}` : <em>null</em>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(ControlPanelMarker);