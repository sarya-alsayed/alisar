const Overview = (props) => {
	var cuisines = props.restObject.cuisines.split(',');
 	return (
		<div className="mt-4">
			<section>
				<h6>CUISINES</h6>
				{cuisines.map((value, index) => {
					return <span key={index} className="badge badge-pill badge-light overviewElem text-info">{value}</span>
				})}
			</section>
			<section>
				<h6>Average Cost</h6>
				<div className="overviewElem text-secondary">
				<span >{props.restObject.average_cost_for_two}$ for two people </span>
				</div>
			</section>
			<section>
				<h6>More Info</h6>
				<div> {props.restObject.highlights.map((value, index) => {
					return (
						<div key={index} className="overviewElem">
							<span className="checkmark float-left">
								<div className="checkmark_circle"></div>
								<div className="checkmark_stem"></div>
								<div className="checkmark_kick"></div>
							</span>
						<span  className="overviewElem text-secondary">{value}</span>
						</div>
					)
					})}
				</div>
			</section>
		</div>	
 	)
}	

export default Overview;