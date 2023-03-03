/* code taken from:

base code: https://github.com/visgl/react-map-gl/blob/7.0-release/examples/draw-polygon/src/draw-control.ts
fix for useControl<>(): https://github.com/visgl/react-map-gl/issues/2104
*/

import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import {useControl} from "react-map-gl";
import {useState, useCallback} from "react";

import type {MapRef, ControlPosition} from "react-map-gl";


type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {

  position?:ControlPosition;
  displayControlsDefault?:false;
  controls?:{
    polygon: true,
    trash: true
  }
  defaultMode?:"draw_polygon"
  onCreate?: (evt: {features: object[]}) => void;
  onUpdate?: (evt: {features: object[]; action: string}) => void;
  onDelete?: (evt: {features: object[]}) => void;
}

DrawControl.defaultProps = {
  onCreate: () => {alert(`polygon`)},
  onUpdate: () => {},
  onDelete: () => {}
};

export function DrawControl(props: DrawControlProps){

  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({map}: {map: MapRef}) => {
      map.on('draw.create', e => props.onCreate && props.onCreate(e));
      map.on('draw.update', e => props.onUpdate && props.onUpdate(e))
      map.on('draw.delete', e => props.onDelete && props.onDelete(e))
    },
    ({map}: {map: MapRef}) => {
      map.off('draw.create', e => props.onCreate && props.onCreate(e))
      map.off('draw.update', e => props.onUpdate && props.onUpdate(e))
      map.off('draw.delete', e => props.onDelete && props.onDelete(e))
    },
    {
      position: props.position
    }
  );

  return null;
}


/* from old prototype */
/*
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: false,
    trash: false,
  },
  defaultMode: "draw_polygon",
});

Map.on("style.load", function () {
  map.addLayer(customLayer, "waterway-label");
  if (three) setPlace(place, province.term, city.name);
});

map.on("draw.create", updateArea);
map.on("draw.delete", updateArea);
map.on("draw.update", updateArea);

function createPolygon() {
  map.addControl(draw);
  map.on("draw.create", updateArea);
}

function updateArea(e) {
  const data = draw.getAll();
  const answer = document.getElementById("calculated-area");
  if (data.features.length > 0) {
    const area = turf.area(data);
    // Restrict the area to 2 decimal points.
    const rounded_area = Math.round(area * 100) / 100;
    answer.innerHTML = `<p><strong>${rounded_area}</strong> mt²</p>`;
  } else {
    answer.innerHTML = "";
  }
}
*/