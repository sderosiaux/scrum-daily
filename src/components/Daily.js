import React from 'react';
import { connect } from 'react-redux';

import spanTasksByDay from '../tools/spanTasksByDay.js';
import { getCreateUserAction } from '../actions/all.js';

import User from './User.js';
import Day from './Day.js';

//
// Pure component
//

const STYLE_DAY_LIST = { listStyleType: 'none', margin: 0, padding: 0 };
const STYLE_USER_LIST = { listStyleType: 'none', margin: 0, padding: 0, display: 'flex' };
const STYLE_BUTTON = { margin: '10px 0' };
const STYLE_USER_ITEM = { paddingBottom: 10, fontWeight: 800, minWidth: 250, maxWidth: 250, padding: 10, marginRight: 10, textAlign: 'center', background: 'rgba(0,0,0,0.2)' };


const createDay = (dayProps) => <li key={dayProps.date}><Day {...dayProps} /></li>;
const createUser = (userProps) => <li key={userProps.id} style={STYLE_USER_ITEM}><User {...userProps} /></li>;

export class Daily extends React.Component {
  render() {
    const { users, days, onCreateUserClick } = this.props;

    return (
      <div>
        <button style={STYLE_BUTTON} onClick={() => onCreateUserClick()}>Add a user</button>
        <ul className="users" style={STYLE_USER_LIST}>
          {users.map(createUser)}
        </ul>
        <ul className="days" style={STYLE_DAY_LIST}>
          {days.map(createDay)}
        </ul>
      </div>
    );
  }
}
Daily.propTypes = {
  users: React.PropTypes.array.isRequired,
  days: React.PropTypes.array.isRequired,
  onCreateUserClick: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state) => ({
  users: state.users,
  days: spanTasksByDay(state.users)
});
const mapDispatchToProps = (dispatch) => ({
  onCreateUserClick: () => dispatch(getCreateUserAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(Daily);
