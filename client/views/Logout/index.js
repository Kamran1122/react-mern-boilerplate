import React from 'react';
import { actions as userActions } from '../../reducers/user';

// - [ ] reset the user
// - [x] cancel the token
// - [ ] route user back to /login
const Logout = props => {
  localStorage.removeItem('token');
  return (
    <div>
      Logout
    </div>
  )
};

export default connect(Logout, {  });
