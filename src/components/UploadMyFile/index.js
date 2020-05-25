// Import : Npm
import React, { Component } from 'react';
import axios from 'axios';

// // Component
// class UploadMyFile extends Component {
//   handleUploadFile = (event) => {
//     const data = new FormData();
//     data.append('file', event.target.files[0]);
//     // '/files' is your node.js route that triggers our middleware
//     axios.post('http://localhost:3000/files', data).then((response) => {
//       console.log(response); // show me something, pretty please
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h1>Test</h1>
//         <input type="file" onChange={this.handleUploadFile} />
//       </div>
//     );
//   }
// }

// // Export
// export default UploadMyFile;