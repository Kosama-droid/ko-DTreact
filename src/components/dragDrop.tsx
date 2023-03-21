/* code from https://www.codemzy.com/blog/react-drag-drop-file-upload */
/* to try - https://www.npmjs.com/package/react-drag-drop-files */

import {useState, useRef} from "react";

// drag drop file component
export const DragDropFile = () => {
    // drag state
    const [dragActive, setDragActive] = useState(false);
    // ref
    const [inputRef, setInputRef] = useState(null);
    //const inputRef = useRef(null);
    
    // handle drag events
    const handleDrag = function(e:any) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e:any) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // handleFiles(e.dataTransfer.files);
        setInputRef(e.dataTransfer.files[0]);
        console.log("handled drop");

      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e:any) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        // handleFiles(e.target.files);
        console.log("handled change");
      }
    };
    
  // triggers the input when the button is clicked
    const onButtonClick = () => {
      //inputRef.current.click();
      console.log("uploaded file ", inputRef);
    };
    
    return (
      <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div> 
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };