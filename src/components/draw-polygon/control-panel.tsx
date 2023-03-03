/* code taken from https://github.com/visgl/react-map-gl/blob/7.0-release/examples/draw-polygon/src/control-panel.tsx */

import * as React from "react";
import area from "@turf/area";

function ControlPanel(props: any) {
  let polygonArea = 0;
  for (const polygon of props.polygons) {
    polygonArea += area(polygon);
  }
  return (
    <div className="control-panel">
      <h3>Draw Polygon</h3>
      {polygonArea > 0 && (
        <p>
          {Math.round(polygonArea * 100) / 100} <br />
          square meters
        </p>
      )}
    </div>
  );
}

export default React.memo(ControlPanel);