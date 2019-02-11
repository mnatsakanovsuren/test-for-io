import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends React.PureComponent {
  state = { pager: {}, initialPage: 1 };



  componentWillMount() {
    const { items } = this.props;
    const { initialPage } = this.state;
    if (items && items.length) this.setPage(initialPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.props;
    const { initialPage } = this.state;
    if (items !== prevProps.items) this.setPage(initialPage);
  }

  setPage = page => {
    const { items, pageSize, onChangePage } = this.props;
    let { pager } = this.state;

    if ((page < 1 || page > pager.totalPages) && items.length === 0) {
      return;
    }

    pager = this.getPager(items.length, page, pageSize);

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager });

    onChangePage({
      filteredUsers: pageOfItems,
      pageNumber: pager.currentPage,
      pageSize
    });
  };

  getPager = (totalItems, currentPage, pageSize) => {
    currentPage = currentPage || 1;

    pageSize = pageSize || 10;

    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    const pages = _.range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  };

  render() {
    const { pager } = this.state;
    const { pageSize, items } = this.props;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    const firstItem = pageSize * (pager.currentPage - 1) + 1;

    const lastItem =
      pageSize * pager.currentPage > items.length
        ? items.length
        : pageSize * pager.currentPage;

    return (
      <div>
        {pager.currentPage !== 1 && (
          <div onClick={() => this.setPage(pager.currentPage - 1)}>{`<`}</div>
        )}
        <div>
          {pager.currentPage === 1
            ? `1 - ${pageSize}`
            : `${firstItem} - ${lastItem}`}
        </div>
        {pager.currentPage !== pager.totalPages && (
          <div onClick={() => this.setPage(pager.currentPage + 1)}>{`>`}</div>
        )}
      </div>
    );
  }
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Pagination;
