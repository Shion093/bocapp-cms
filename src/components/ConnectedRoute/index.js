import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

const mapStateToProps = state => ({
  location: state.reducers.routing.location,
});

const ConnectedRoute = connect(mapStateToProps)(Route);

export default ConnectedRoute;