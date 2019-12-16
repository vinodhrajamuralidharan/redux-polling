import React  from 'react';
import { Link } from 'react-router-dom';
import { Grid, Image, Header, Button, Icon } from 'semantic-ui-react'

const FourZeroFour = () => {
	return (
		<Grid stackable columns={2}>
			<Grid.Row>
				<Grid.Column textAlign='center' verticalAlign='middle'>
					<Image verticalAlign='middle' src='https://static1.squarespace.com/static/51cdafc4e4b09eb676a64e68/t/57a119e3f5e23161e8daf73d/1470175723578/?format=500w' />
				</Grid.Column>
				<Grid.Column textAlign='center' verticalAlign='middle'>
					<Header as='h1'>
						Awww...Don’t Cry.
					</Header>
					<Header as='h3'>It's just a 404 Error!</Header>
					<p>What you’re looking for may have been misplaced in Long Term Memory.</p>
					<p>&nbsp;</p>
					<Button as={Link} to='/' animated='fade'>
						<Button.Content visible>Back to Home</Button.Content>
						<Button.Content hidden>
							<Icon name='home' />
						</Button.Content>
					</Button>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
};

export default FourZeroFour;