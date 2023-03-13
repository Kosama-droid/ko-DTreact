/** code taken from https://github.com/visgl/react-map-gl/blob/7.0-release/examples/draggable-markers/src/app.tsx */

import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import Map, {Marker, NavigationControl} from 'react-map-gl';

import ControlPanelMarker from './control-panel';
import Pin from './pin';

import type {MarkerDragEvent, LngLat} from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

const initialViewState = {
  latitude: 40,
  longitude: -100,
  zoom: 3.5
};

export default function MarkerApp() {
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);

  return (
    <>
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <NavigationControl />
      <ControlPanelMarker events={events} />
    </>
  );
}

export function renderToDom(container:any) {
  render(<MarkerApp />, container);
}