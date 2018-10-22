import React, { Component } from 'react';
import './App.css';
import {Tabs, Tab} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Tab1data from './component/Tab1data';
import Tab2data from './component/Tab2data';

class App extends Component {
  constructor(props: any, context)
    {
        super(props, context);


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
        };
    }


    handleChange(selectorFiles)
    {
        // let json = {}
        if (selectorFiles !== null) {

        let con = '';
        let cons = '';
        // debugger;
        console.log(selectorFiles);
        const filetype = selectorFiles.name.substring(selectorFiles.name.lastIndexOf('.') + 1, selectorFiles.name.length);
        if (filetype === 'xml') {
        const fileReader = new FileReader();
        const fileReader2 = new FileReader();
        fileReader.onloadend = (e) => {
          con = fileReader.result;

          fetch('http://localhost:5000/uploads', {
      			method: 'post',
      			headers: {'Content-Type': 'application/json'},
      			body: JSON.stringify({
      				con : con
      			})
      		})
          .then(response => response.json())
          .then(resp => {
            console.log('pehla resp');
            if (resp['result'] === 'data invalid') {
              alert ('Xml file is either corrupted or has empty fields.');
            } else if (resp['result'] === 'success'){
              console.log('if response');
              console.log(resp);
            fetch('http://localhost:5000/fetchdata', {
        			method: 'post',
        			headers: {'Content-Type': 'application/json'},

        		})
            .then(response => response.json())
            .then(response => {
              console.log(response);

              this.setState({ xml: response.rsp_obj.xmldata});

              console.log('xml');
              console.log(this.state.xml);
              this.setState({ past: response.rsp_obj.pastrecords});

              console.log('past');
              console.log(this.state.past);

              this.setState({status: true});


            })
          } else {
            console.log('elseresp');
            console.log(resp);
          }
          })

        };

        fileReader.readAsText(selectorFiles);
        fileReader2.readAsArrayBuffer(selectorFiles);

      } else {
        alert('Please upload an XML file');
      }
    }
}

    handleSelect(key) {

    console.log('key'+key);
    this.setState({ key: key });
    if(key===2) {

      console.log('vasgv');
      fetch('http://localhost:5000/fetchalldata', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},

      })
      .then(response => response.json())
      .then(response => {
         console.log(response);

        this.setState({ allrecords: response });
        this.setState({ allrecordsdummy: response });

        console.log('allrecords');
        console.log(this.state.allrecords);
      })
    }

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



  render() {
    let page;
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



    return (
      <Tabs className="App" defaultActiveKey={1} id="uncontrolled-tab-example"
      activeKey={this.state.key}
      onSelect= {this.handleSelect}>
        <Tab eventKey={1} title="UPLOAD XML FILE">
            <input type="file" name="upload"
            accept="text/xml"

            onChange={ (e) => this.handleChange(e.target.files[0]) } />
            { page }
        </Tab>
        <Tab eventKey={2} title="PAST RECORDS" >
          <Tab2data handleClickGoBack = {handleClickGoBack.bind(this)}
          handleClick = {handleClick.bind(this)} viewdetails_id={this.state.viewdetails_id}
          allrecordsdummy={this.state.allrecordsdummy}
          allrecords={this.state.allrecords} />

        </Tab>
      </Tabs>
    );
  }
}

export default App;
