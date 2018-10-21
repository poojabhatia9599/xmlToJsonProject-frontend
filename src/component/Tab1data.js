import React, {Component} from 'react';
import {Table} from 'react-bootstrap';


class Tab1data extends Component {
	render() {

		const {past,xml} = this.props;
		// console.log('xml');
		// console.log(xml);
		// console.log('past');
		// console.log(past);
			// debugger; 
		const listt = past.map((name,i) => {
			return (
				<tr key={i}>

				<td >{name.vehicletype}</td>
				<td >{name._id}</td>
				<td >{name.frame}</td>
				<td >{name.powertrain}</td>
				<td >{name.wheels.position}</td>
				<td >{name.date}</td>
				<td ><a href={xml.s3link}>{xml.s3link}</a></td>
				</tr>
			)
		})

		return(
			<div>
			<Table striped bordered condensed hover>
					<thead>
						<tr>

							<th>Vehicle name</th>
							<th>Id</th>
							<th>Frame</th>
							<th>Powertrain</th>
							<th>Wheels</th>
							<th>TimeStamp</th>
							<th>File link</th>
						</tr>
					</thead>
					<tbody>
				{listt}
					</tbody>
			</Table>
			</div>
		);
	}

}
	// return (
		// <div>
		//
		// 	<Table striped bordered condensed hover>
		// 		<thead>
		// 			<tr>
		// 				<th>#</th>
		// 				<th>Vehicle name</th>
		// 				<th>Id</th>
		// 				<th>Frame</th>
		// 				<th>Powertrain</th>
		// 				<th>Wheels</th>
		// 				<th>File link</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody>
		// 		{past.map(i => {
		// 			return <tr>
		// 				<td>1</td>
		// 				<td>Mark</td>
		// 				<td>Otto</td>
		// 				<td>@mdo</td>
		// 				<td>@mdo</td>
		// 				<td>@mdo</td>
		// 				<td>@mdo</td>
		// 			</tr>
		// 		})}
		//
		// 		</tbody>
		// 	</Table>
		// </div>
		// );
// }

export default Tab1data;
