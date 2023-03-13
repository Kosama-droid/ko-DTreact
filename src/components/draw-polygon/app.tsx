import * as React from "react";
import { useState, useCallback } from "react";
import {render} from "react-dom";
import { Map} from "react-map-gl";
import {DrawControl} from "./draw-controls";
import ControlPanel from "./control-panel";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export default function PolygonApp() {
    
    const [features, setFeatures] = useState({});

    const onUpdate = useCallback((e: any) => {
        setFeatures(currFeatures => {
            const newFeatures:any = {...currFeatures};
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
        return newFeatures;
    });
    }, []);

    const onDelete = useCallback((e: any) => {
        setFeatures(currFeatures => {
        const newFeatures:any = {...currFeatures};
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
        return newFeatures;
    });
    }, []);

    return (
    <>
        <DrawControl
            position="bottom-left"
            displayControlsDefault={false}
            controls={{
            polygon: true,
            trash: true
            }}
            defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />
        <ControlPanel polygons={Object.values(features)} />
    </>
    )
}

export function renderToDom(container:any) {
    render(<PolygonApp />, container);
  }