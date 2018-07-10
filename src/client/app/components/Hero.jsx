import React, { Component } from 'react';
import bgImage from '../../public/assets/mario-1558068_1280.jpg';

class Hero extends Component {
	render() {
		return(
			<div
				className="row-wrapper hero-wrapper"
				style={{
					'backgroundImage': `url(${bgImage})`
				}}>
				<div className="row max-width hero-row">
					<div className="col12 text-center">
						<h1>Video Game Recommendations</h1>
					</div>
				</div>
			</div>
		)
	}
}

export default Hero;