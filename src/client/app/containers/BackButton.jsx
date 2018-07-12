import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BackButton extends Component {
	render() {
		let props = this.props;
		return (
			<div className="row-wrapper">
				<div className="row small-row-padding max-width">
					<div className="col12">
						<a
							href="#back"
							onClick={ (e) => {
								e.preventDefault();
								props.history.goBack();
							} }>
							Back to { props.backScreen }
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(BackButton);