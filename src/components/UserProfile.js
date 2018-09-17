import React from 'react'
import { connect } from 'react-redux'
import { Collection, CollectionItem, } from 'react-materialize'

function mapStateToProps (state) {
  return { user: state.auth.user }
}

const UserProfile = (props) => {
  return (
    <div>
      <h5>Logged In User's Email:</h5>
      <Collection>
        <CollectionItem>Email: { props.user.email }</CollectionItem>
      </Collection>
    </div>
  )
}

export default connect(mapStateToProps, null)(UserProfile)
