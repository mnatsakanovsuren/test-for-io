import React, { Component } from "react";
import UserData from "./data.json";
import "./App.css";
import SearchComponent from "./components/SearchComponent.jsx";
import UserCard from "./components/UserCard.jsx";
import Pagination from "./components/PaginationComponent.jsx";
import _ from "lodash";


class App extends Component {
  state = {
    users: [],
    searchValue: "",
    filteredUsers: [],
    pageIndex: 0,
    medalists: {}
  };


  componentDidUpdate() {
    console.log('update');
  }

  componentDidMount() {
    const users = _.cloneDeep(UserData).sort((a, b) =>
      a.pageviews < b.pageviews ? 1 : b.pageviews < a.pageviews ? -1 : 0
    );
    const medalists = {
      gold: users[0].pageviews,
      silver: users[1].pageviews,
      bronze: users[2].pageviews
    };
    this.setState({ users: UserData, medalists });
  }

  handleSearchChange = ({ target: { value } }) => {
    const users = UserData.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ searchValue: value, users });
  };

  onChangePage = ({ filteredUsers, pageNumber, pageSize }) => {
    this.setState({
      filteredUsers,
      pageIndex: pageNumber === 1 ? 0 : (pageNumber - 1) * pageSize
    });
  };

  render() {
    const {
      users,
      searchValue,
      filteredUsers,
      pageIndex,
      medalists
    } = this.state;
    return (
      <div className="UserTable">
        <SearchComponent
          searchValue={searchValue}
          handleSearchChange={this.handleSearchChange}
        />
        <div className="userList">
          {filteredUsers.map((user, index) => (
            <UserCard
              user={user}
              number={pageIndex + index + 1}
              key={index}
              medalists={medalists}
            />
          ))}
        </div>
        <Pagination
          items={users}
          pageSize={10}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

export default App;
