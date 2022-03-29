import React, { Component } from 'react';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// import * as FilePond from 'react-filepond';

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import isEmpty from 'lodash.isempty';


// Register the plugins
registerPlugin(FilePondPluginFileEncode, FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginImageTransform);

// Our app
export default class ImageHandler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
             {
              id: "",
              name: "",
              type: "",
              size: 0,
              metadata: {
                  resize: {
                      mode: "",
                      size: {
                          width: 0,
                          height: 0
                      }
                  },
                  crop: {
                      rect: {
                          x: 0,
                          y: 0,
                          width: 0,
                          height: 0
                      },
                      aspectRatio: 1
                  }
              },
              data: ""
              }
      ],
      fileUploaded: false
    };
  }

  handleInit() {
    console.log("FilePond instance has initialized", this.pond);
    console.log(this.state.files);
    if(!isEmpty(this.props.photos)){
      this.setState({ files: this.props.photos.map(fileItem => fileItem.file)})
    }
  }

  uploadFiles() {
    const formData = new FormData();
    this.props.parentFileCallback(this.state.files)
    this.setState({fileUploaded:true})
    // const file = this.pond.getFiles().map(fileItem => fileItem.file).foreach(file => {formData.append(file, file.name)});
    // console.log(file)
  }

  
  render() {
    return (
      <div className="App">
        <FilePond 
            ref={ref => (this.pond = ref)}
            // files={this.state.files}
            allowMultiple={false}
            allowImageExifOrientation={true}
            allowImageTransform={true}
            allowImageResize={true}
            allowReorder={true}
            allowFileEncode={true}
            imageEditInstantEdit={true}
            imageResizeMode={'cover'}
            imageResizeTargetWidth={800}
            imageResizeTargetHeight={null}
            instantUpload={false}
            // maxFiles={5}
            oninit={() => this.handleInit()}
            onupdatefiles={fileItems => {
              // Set currently active file objects to this.state
              this.setState({
                files: fileItems.map(fileItem => fileItem.file)
              });
              this.uploadFiles();
            }}
        />        
      </div>
    );
  }
 }

