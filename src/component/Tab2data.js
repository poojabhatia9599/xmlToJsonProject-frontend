import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Tab2data extends Component {
	// var allrecords;
	// var istherearecord = false;
	//
	constructor(props)
    {
        super(props);
				// this.state= {
				// 	allrecords: this.props.allrecords,
				// 	viewdetails_id: this.props.viewdetails_id,
				// 	allrecordsdummy: this.props.allrecordsdummy
				// }
				// console.log(this.props.allrecords);
				// 'this.handleClick = this.handleClick.bind(this);
				// this.handledata = this.handledata.bind(this);
				// this.handledata();
    }
	// componentWillMount() {
	// 	// console.log('shdgashvda');
	//   if(this.props.allrecords) {
	//     this.setState({istherearecord: true});
	//   }
	// }

 // handledata() {
	//  this.setState({
	// 	 allrecords: this.props.allrecords,
	// 	 viewdetails_id: this.props.viewdetails_id,
	// 	 allrecordsdummy: this.props.allrecordsdummy
	//  });
 // }

	// handleClick(id) {
	// 	debugger;
  //       this.setState({
  //           allrecords: null,
	// 					viewdetails_id: id
  //       });
  //   }
	// onbuttonclick = (id) => {
	// 	this.setState({allrecords: null});
	// 	this.setState({viewdetails_id: id});
	// 	// this.state.viewdetails_id = id;
	// }

	render() {

		// debugger;

		var handleClick  =   this.props.handleClick;
		if (this.props.allrecords !== null) {
			const alldata = this.props.allrecords.data;
			 // debugger;
			 const listt = alldata.map((data, i) => {
	 				return (

						<tr key={i}>

						<td >{data.xmldata._id}</td>
						<td ><a href={data.xmldata.s3link}>{data.xmldata.s3link}</a></td>
						<td >{data.xmldata.date}</td>
						<td><button onClick={() => handleClick(data.xmldata._id)}>View details</button> </td>
						</tr>
	 				)
	 			})
				// return(
				// 	<p>balsss</p>
				// )

				return(
					<div>
					<Table striped bordered condensed hover>
							<thead>
								<tr>

									<th>Id</th>
									<th>File link</th>
									<th>Timestamp</th>
									<th>View details</th>
								</tr>
							</thead>
							<tbody>
						{listt}
							</tbody>
					</Table>
					</div>
				);

		} else {
			
			if (this.props.viewdetails_id) {
				var handleClickGoBack  =   this.props.handleClickGoBack;

				// return(
				// 	<div>
				// 	<button onClick={() => handleClickGoBak()}>Go back</button>
				// 	<p>{this.props.viewdetails_id.xmldata.s3link}</p>
				// 	</div>
				// ); okay run krke dekhteha
				const listdata = this.props.viewdetails_id.pastrecords.map((name,i) => {
					return (
						<tr key={i}>

						<td >{name.vehicletype}</td>
						<td >{name._id}</td>
						<td >{name.frame}</td>
						<td >{name.powertrain}</td>
						<td >{name.wheels.position}</td>
						<td >{name.date}</td>

						</tr>
					)
				})
				return(
					<div>
					<button onClick={() => handleClickGoBack()}>Go back</button>
					<Table striped bordered condensed hover>
							<thead>
								<tr>

									<th>Vehicle name</th>
									<th>Id</th>
									<th>Frame</th>
									<th>Powertrain</th>
									<th>Wheels</th>
									<th>TimeStamp</th>

								</tr>
							</thead>
							<tbody>
						{listdata}
							</tbody>
					</Table>
					</div>
				);
			}

			//const detail_data = this.state.allrecordsdummy.filter(data => data.xmldata._id === id);
			return null;
		}
		//const {allrecords, istherearecord } = this.state;
		// console.log('allrecords');
		// console.log(allrecords);
		// let listt = null;
		// if (this.props.allrecords !== null) {
		// 		listt = this.props.allrecords.map((name,i) => {
		// 		return (
		// 			<tr key={i}>
		//
		// 			<td >{name._id}</td>
		// 			<td >{name.date}</td>
		// 			<td ><a href={name.s3link}>{name.s3link}</a></td>
		// 			</tr>
		// 		)
		// 	})
		// }


		// return(
		// 	<div>
		// 	<Table striped bordered condensed hover>
		// 			<thead>
		// 				<tr>
		//
		// 					<th>Id</th>
		// 					<th>TimeStamp</th>
		// 					<th>File link</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				{listt}
		// 			</tbody>
		// 	</Table>
		// 	</div>
		// );
	}
}
export default Tab2data;
