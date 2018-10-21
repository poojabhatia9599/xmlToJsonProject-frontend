import React, { Component } from 'react';
import './App.css';
import {Tabs, Tab} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Tab1data from './component/Tab1data';
import Tab2data from './component/Tab2data';
import Tabreplace from './component/Tabreplace';
import input from './component/input';
// const fs = require('fs');
// import { uploadFile } from 'react-s3';
// var X2JS = require('x2js');
// import x2js from 'x2js';
// import Tab1 from './component/Tab1';
// import Tab2 from './component/Tab2';


// const initialState = {
//   content : ''
// }

class App extends Component {
  constructor(props: any, context)
    {
        super(props, context);
        //this.state = initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
          key: 1,
          xml: 'false',
          past: 'false',
          allrecords: null,
          allrecordsdummy: null,
          status: false,
          viewdetails_id: null,
          istherearecord: false
        };
    }

    // componentDidMount() {
    //   if(this.state.allrecords) {
    //     this.setState({istherearecord: true});
    //   }
    // }

    //let fileReader;
    handleChange(selectorFiles)
    {
        // let json = {}
        let con = '';
        let cons = '';

        const fileReader = new FileReader();
        const fileReader2 = new FileReader();
        fileReader.onloadend = (e) => {
          con = fileReader.result;
          fetch('https://afternoon-inlet-42676.herokuapp.com/uploads', {
      			method: 'post',
      			headers: {'Content-Type': 'application/json'},
      			body: JSON.stringify({
      				con : con
      			})
      		})
          .then(response => response.json())
          .then(resp => {
            console.log('pehla resp');

            if (resp['result'] === 'success'){
              console.log('if response');
              console.log(resp);
            fetch('https://afternoon-inlet-42676.herokuapp.com/fetchdata', {
        			method: 'post',
        			headers: {'Content-Type': 'application/json'},
        			// body: JSON.stringify({
              //
        			// })
        		})
            .then(response => response.json())
            .then(response => {
              console.log(response);
              //setstate kr yah
              // debugger;
              this.setState({ xml: response.rsp_obj.xmldata});
              // console.log('xml');
              // console.log(this.state.xml);
              console.log(this.state.xml);
              this.setState({ past: response.rsp_obj.pastrecords});
              // debugger;
              // console.log('past');
              console.log('state ka value');
              console.log(this.state.past);
              // console.log(this.state.past);
              this.setState({status: true});


            })
          } else {
            console.log('elseresp');
            console.log(resp);
          }
          })

        };
      //   fileReader2.onloadend = (e) => {
      //     cons = fileReader2.result;
      //     console.log(cons)
      //     var fd = new FormData();
      //     fd.append('file', cons);
      //         // if (err) throw err;
      //     //const formData = new FormData();
      //   // formData.append('file', cons);
      //   fetch('http://localhost:5000/s3upload', {
      //     method: 'post',
      //     headers: {'Content-Type': 'multipart/form-data'},
      //     body: fd
      //   })
      //   // .then(response => response.json())
      //   .then(resp => {
      //
      //     console.log(resp);
      //   })
      // };
        fileReader.readAsText(selectorFiles);
        fileReader2.readAsArrayBuffer(selectorFiles);
        // console.log(typeof(selectorFiles));

        //const data = readAsBuffer()
        // console.log(this.state.content);

    }

    handleSelect(key) {
    // alert(`selected ${key}`);
    console.log('key'+key);
    this.setState({ key: key });
    if(key===2) {

      console.log('vasgv');
      fetch('https://afternoon-inlet-42676.herokuapp.com/fetchalldata', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({
        //
        // })
      })
      .then(response => response.json())
      .then(response => {
         console.log(response);

        this.setState({ allrecords: response });
        this.setState({ allrecordsdummy: response });
      //   if(response) {
      //this.setState({ istherearecord: true});
      // }
        console.log('allrecords');
        console.log(this.state.allrecords);
      })
    }
    // if(this.state.allrecords) {
    //   this.setState({ istherearecord: true});
    // }
  }

onfileupload = () => {

  if (this.state.past !== 'false') {
  this.setState({ status: true});
}
  }

  onfileuploading = () => {
    if (this.state.past !== 'false') {
    this.setState({ status: true});
  }
  }

    handleClick(id) {
      for (let i = 0; i < this.state.allrecordsdummy.data.length; i++) {
        if (this.state.allrecordsdummy.data[i].xmldata._id === id) {
          this.setState({viewdetails_id: this.state.allrecordsdummy.data[i],
                          allrecords: null});
        }
      }

      }
      handleClickGoBack() {
        const records = this.state.allrecordsdummy
        this.setState({
          allrecords: records,
          viewdetails_id: null
        });

        }

 // aretherrecords = () => {
 //   if(this.state.allrecords) {
 //     this.setState({ istherearecord: true})
 //   }
 // }

  render() {

    // const status = this.state.status;
    // const allrecords = this.state.allrecords;
    // const istherearecord = this.state.i

    let page;
    let tab2;
    var handleClick  =   this.handleClick;
    var handleClickGoBack  =   this.handleClickGoBack;
    if(this.state.status !== false && this.state.past !== null) {
      page =
      <div>
      <Button bsStyle="primary" onClick={this.onfileupload} >Report</Button>
      <Tab1data past={this.state.past} xml={this.state.xml}/>
      </div>;
    } else {
      page = <h3> Upload an XML file for the report generation.</h3>;
    }

    // if(this.state.allrecords !== 'false') {
    //   tab2 =
    //
    // } else {
    //   tab2 = <Tabreplace />
    // }

    return (
      <Tabs className="App" defaultActiveKey={1} id="uncontrolled-tab-example"
      activeKey={this.state.key}
      onSelect= {this.handleSelect}>
        <Tab eventKey={1} title="UPLOAD XML FILE">
            <input type="file" name="upload"
            accept="application/xml"
            // onfileupload={this.onfileupload}
            onChange={ (e) => this.handleChange(e.target.files[0]) } />
            { page }
        </Tab>
        <Tab eventKey={2} title="PAST RECORDS" >
          <Tab2data handleClickGoBack = {handleClickGoBack.bind(this)}
          handleClick = {handleClick.bind(this)} viewdetails_id={this.state.viewdetails_id}
          allrecordsdummy={this.state.allrecordsdummy}
          allrecords={this.state.allrecords} istherearecord={this.state.istherearecord}/>

        </Tab>
      </Tabs>
    );
  }
}

export default App;
