import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Tab2data extends Component {

	constructor(props)
    {
        super(props);

    }






	render() {



		var handleClick  =   this.props.handleClick;
		if (this.props.allrecords !== null) {
			const alldata = this.props.allrecords.data;

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

			
			return null;
		}




	}
}
export default Tab2data;
