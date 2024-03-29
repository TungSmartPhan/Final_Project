import React from 'react';
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

const AvatarProfile = ({NewAvatar}) => {

    const {user} = useContext(AuthContext);

    console.log(user);
    return (
      <div className="avatar__profile">
        <img
          src={NewAvatar ? NewAvatar : user.avatar}
          alt="avatar"
        />
      </div>
    );
  };
  
  export default AvatarProfile;